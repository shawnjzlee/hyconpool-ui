import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CircularProgress from "@material-ui/core/CircularProgress"
import Collapse from "@material-ui/core/Collapse"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import { withStyles, WithStyles } from "@material-ui/core/styles"
import { Theme } from "@material-ui/core/styles/createMuiTheme"
import createStyles from "@material-ui/core/styles/createStyles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableFooter from "@material-ui/core/TableFooter"
import TableHead from "@material-ui/core/TableHead"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import Typography from "@material-ui/core/Typography"
import InfoIcon from "@material-ui/icons/InfoOutlined"
import * as React from "react"
import { Component } from "react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"
import { IText } from "../locales/locales"

// tslint:disable:no-var-requires
const {XAxis, YAxis, CartesianGrid, Tooltip, Legend}  = require("recharts")
const endpoint = require("../data/endpoints.json")

const styles = (theme: Theme) => createStyles({
    graph: {
        padding: "5% 0",
        margin: "auto 4%",
        color: theme.palette.type === "dark" ? "white" : "black",
    },
})

interface IMinerData {
    timestamp: string,
    workers: number,
    valid_hashes: number,
    stale_hashes: number,
    pending_hashes: number
}

interface IMinerPayout {
    address: string,
    txid: string,
    timestamp: string,
    paidFee: number,
    paidAmount: number
}

interface IMinerInfo {
    minerData: IMinerData[],
    minerPayouts: IMinerPayout[],
    minerFee: number,
    totalPaid: number
}

interface IMinerProps extends WithStyles<typeof styles> {
    hash: string
    locale: IText
}

interface IMinerDetailsState {
    hash: string
    workers: number,
    hashrate: string,
    currentFee: string,
    totalPaid: string,
    mounted: boolean,
    page: number,
    rowsPerPage: number,
    openedPromo: boolean,
    validPromo: boolean,
    appliedPromo: boolean,
    promo: string,
    openedTip: boolean
}

class MinerDetails extends Component<IMinerProps, IMinerDetailsState> {
    private hashStats: any = []
    private payouts: any = []
    constructor(props: any) {
        super(props)
        this.state = {
            hash: props.hash,
            workers: 0,
            hashrate: "",
            currentFee: "",
            totalPaid: "",
            mounted: false,
            page: 0,
            rowsPerPage: 10,
            openedPromo: false,
            validPromo: true,
            appliedPromo: false,
            promo: "",
            openedTip: false,
        }
    }

    public async componentDidMount() {
        const {minerData, minerPayouts} = await this.loadData(this.state.hash)
        this.hashStats = minerData
        this.payouts = minerPayouts

        this.setState({ mounted: true })
    }

    public handleChangePage = (event: any, page: number) => {
        this.setState({ page })
    }

    public handleChangeRowsPerPage = (event: any) => {
        this.setState({ rowsPerPage: event.target.value })
    }

    public render() {
        const { rowsPerPage, page } = this.state
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.payouts.length - page * rowsPerPage)

        return(
            <Grid container style={{ flexGrow: 1 }}>
                <Grid item xs={12} style={{ margin: window.matchMedia("(max-width: 600px)").matches ? 20 : 60 }}>
                    <Typography gutterBottom variant={window.matchMedia("(max-width: 600px)").matches ? "h4" : "h3"} style={{ maxWidth: "80%" }}>
                        {this.state.hash}
                    </Typography>
                    <Typography gutterBottom variant="body2">
                        miner (your payout address)
                    </Typography>
                    <Card style={{ marginTop: "5%", boxShadow: "0 3px 5px 2px rgba(250, 200, 77, .3)" }}>
                        <CardContent style={{ height: 80, background: "linear-gradient(122deg, rgb(229, 103, 107) 0%, rgb(250, 200, 77) 39%, rgb(246, 172, 75) 100%)", paddingBottom: 0 }}>
                            <Typography variant="h6">
                                Statistics
                            </Typography>
                        </CardContent>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">{this.props.locale["your-hashrate"]}</TableCell>
                                    <TableCell align="right"><Typography variant="h4"><code>{this.state.hashrate}</code><span style={{ fontSize: 12 }}>&nbsp;H/s</span></Typography></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">{this.props.locale["your-workers"]}</TableCell>
                                    <TableCell align="right"><Typography variant="h4"><code>{this.state.workers}</code><span style={{ fontSize: 12 }}>&nbsp;{this.state.workers === 1 ? "worker" : "workers"}</span></Typography></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">{this.props.locale["total-earned"]}</TableCell>
                                    <TableCell align="right"><Typography variant="h4"><code>{this.state.totalPaid}</code><span style={{ fontSize: 12 }}>&nbsp;HYC</span></Typography></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">{this.props.locale["current-fee"]}<IconButton onClick={() => {this.setState({ openedTip: !this.state.openedTip })}}><InfoIcon /></IconButton></TableCell>
                                    <TableCell align="right"><Typography variant="h4" noWrap><code>{this.state.currentFee}</code><span style={{ fontSize: 12 }}>&nbsp;%</span></Typography></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Collapse in={this.state.openedTip} timeout="auto" unmountOnExit>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Your fee decreases while you're mining in this pool! The fee starts at 1.0% and slides down to 0.25%. Your rate decreases by 0.1% every 12 hours until you reach 0.25%. If you aren't mining in the pool for an extended period of time, the fee will reset to 1.0%.</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Collapse>
                        <Grid item xs={12} className={this.props.classes.graph}>
                            { this.state.mounted ?
                                <ResponsiveContainer width="95%" height={300}>
                                    <BarChart data={this.hashStats} margin={{bottom: 5}}>
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="timestamp" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="valid_hashes" stackId="a" fill="#18FFFF" name="Winning Hashes"/>
                                        <Bar dataKey="stale_hashes" stackId="a" fill="#E0E0E0" name="Submitted Hashes"/>
                                        <Bar dataKey="pending_hashes" stackId="a" fill="#FFF176" name="Pending Hashes"/>
                                    </BarChart>
                                </ResponsiveContainer> :
                                <CircularProgress />
                            }
                        </Grid>
                    </Card>
                    <Card style={{ marginTop: "5%", boxShadow: "0 3px 5px 2px rgba(142, 41, 179, .3)" }}>
                        <CardContent style={{ height: 80, background: "linear-gradient(45deg, #ca002e 0%,#8e29b3 62%,#fcb2d5 100%)", paddingBottom: 0 }}>
                            <Typography variant="h6">
                                { this.props.locale["table-shares"] }
                            </Typography>
                        </CardContent>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{ this.props.locale["table-timestamp"] }</TableCell>
                                    <TableCell align="right">{this.props.locale["table-to"]}</TableCell>
                                    <TableCell align="right">{this.props.locale["table-txid"]}</TableCell>
                                    <TableCell align="right">{this.props.locale["table-amount"]}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { this.payouts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((payout: any) => {
                                    return (
                                        <TableRow key={payout.txid} hover>
                                            <TableCell style={{ fontWeight: 600 }}>
                                                {payout.timestamp} UTC
                                            </TableCell>
                                            <TableCell>
                                                <code>{payout.address}</code>
                                            </TableCell>
                                            <TableCell align="right" style={{ textOverflow: "ellipsis" }}>
                                                <code>{payout.txid}</code>
                                            </TableCell>
                                            <TableCell align="right">
                                                <code>{payout.paidAmount}</code>
                                            </TableCell>
                                        </TableRow>
                                    )})
                                }
                                { emptyRows > 0 && (
                                    <TableRow style={{ height: 48 * emptyRows }}>
                                        <TableCell colSpan={3}/>
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        colSpan={3}
                                        count={this.payouts.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </Card>
                </Grid>
            </Grid >
        )
    }

    private async loadData(hash: string): Promise<IMinerInfo> {
        const url = endpoint.miner + this.state.hash
        const response: IMinerInfo = await (await fetch(url)).json()
        const minerFee = response.minerFee
        const totalPaid = response.totalPaid
        const minerData: IMinerData[] = []
        for (const row of response.minerData) {
            const stat: IMinerData = {
                timestamp: row.timestamp.split("T")[1].slice(0, 5),
                workers: Number(row.workers),
                valid_hashes: Number(row.valid_hashes),
                stale_hashes: Number(row.stale_hashes),
                pending_hashes: Number(row.pending_hashes),
            }
            minerData.push(stat)
        }
        const minerPayouts: IMinerPayout[] = []
        for (const row of response.minerPayouts) {
            const payout: IMinerPayout = {
                address: row.address,
                txid: row.txid,
                timestamp: row.timestamp.replace("T", " ").substring(0, 19),
                paidFee: Number(row.paidFee * 100),
                paidAmount: Number(row.paidAmount / 1000000000),
            }
            minerPayouts.push(payout)
        }

        const dataSample = response.minerData.filter((x) => (Date.now() - Date.parse(x.timestamp)) < 3600000)
        let totalHashes = 0
        for (const row of dataSample) {
            totalHashes = totalHashes + Number(row.valid_hashes) + Number(row.pending_hashes) + Number(row.stale_hashes)
        }

        if (dataSample.length > 0) {
            const timeBegin = this.timestampToSeconds(dataSample[0].timestamp)
            const timeEnd = this.timestampToSeconds(dataSample[dataSample.length - 1].timestamp)
            if (timeBegin !== timeEnd) {
                this.setState({ hashrate: (totalHashes / Math.abs(timeBegin - timeEnd)).toFixed(4) })
            } else {
                this.setState({hashrate: (totalHashes / 600).toFixed(4)})
            }
        } else {
            this.setState({hashrate: "0"})
        }

        this.setState({ currentFee: (minerFee * 100).toFixed(3) })
        this.setState({ totalPaid: response.totalPaid.toFixed(4) })
        this.setState({ workers: response.minerData[response.minerData.length - 1].workers})
        return {minerData, minerPayouts, minerFee, totalPaid}
    }

    private timestampToSeconds(timestamp: string) {
        const timeComponents: any = timestamp.split("T")[1].slice(0, 5).split(":")
        return ((timeComponents[0] * 60 * 60) + (timeComponents[1] * 60))
    }
}

export default withStyles(styles, { withTheme: true })(MinerDetails)
