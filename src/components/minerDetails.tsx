import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CircularProgress from "@material-ui/core/CircularProgress"
import Collapse from "@material-ui/core/Collapse"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableFooter from "@material-ui/core/TableFooter"
import TableHead from "@material-ui/core/TableHead"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import TooltipUI from "@material-ui/core/Tooltip"
import Typography from "@material-ui/core/Typography"
import InfoIcon from "@material-ui/icons/Info"
import * as React from "react"
import { Component } from "react"
import MediaQuery from "react-responsive"
import { Bar, BarChart, ResponsiveContainer } from "recharts"
import { IText } from "../locales/locales"
// tslint:disable:no-var-requires
const WebFont = require("webfontloader")
const {XAxis, YAxis, CartesianGrid, Tooltip, Legend}  = require("recharts")
const endpoint = require("../data/endpoints.json")

WebFont.load({
    google: {
      families: ["Open Sans:400,600,700,800"],
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

interface IMinerProps {
    hash: string
    locale: IText
    font: string
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
    opened: boolean
}

export class MinerDetails extends Component<IMinerProps, IMinerDetailsState> {
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
            opened: false,
        }
    }

    public async componentDidMount() {
        const {minerData, minerPayouts} = await this.loadData(this.state.hash)
        this.hashStats = minerData
        this.payouts = minerPayouts

        this.setState({ mounted: true })
    }

    public handleChange = () => {
        this.setState((state) => ({ opened: !state.opened }))
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
            <div style={{overflow: "hidden" }}>
                <Grid container
                    style={{
                        height: "40vh",
                        background: "linear-gradient(122deg, #e5676b 0%,#fac84d 39%,#f6ac4b 100%)",
                    }}>
                    <Grid item xs={12} style={{ margin: "auto 4%"}}>
                        <Typography style={{ fontFamily: this.props.font, fontWeight: 600 }}>
                            { this.props.locale["miner-title"] }
                        </Typography>
                        <TooltipUI id="payout-addr" title="Your Payout Address" placement="bottom-start">
                            <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 700, wordWrap: "break-word" }}>
                                {this.state.hash}
                            </Typography>
                        </TooltipUI>
                    </Grid>
                </Grid>
                <Grid container
                    style={{
                        minHeight: "30vh",
                        backgroundColor: "#000",
                    }}>
                    <Grid item xs={12} style={{ padding: "5% 0", margin: "auto 4%" }}>
                        <MediaQuery query="(min-device-width: 800px)">
                            <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                { this.props.locale["your-hashrate"] } | <code> {this.state.hashrate} H/s </code>
                            </Typography>
                            <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                {this.props.locale["your-workers"]} | <code> {this.state.workers} {this.state.workers > 1 ? this.props.locale.workers : this.props.locale.worker} </code>
                            </Typography>
                            <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                {this.props.locale["total-earned"]} | <code> {this.state.totalPaid} HYC </code>
                            </Typography>
                            <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                {this.props.locale["current-fee"]} | <code> {this.state.currentFee}% </code>
                                <IconButton style={{ fontSize: 8, color: "#fff" }} onClick={this.handleChange}>
                                    <TooltipUI title={this.props.locale["whats-this"]} placement="right">
                                        <InfoIcon/>
                                    </TooltipUI>
                                </IconButton>
                            </Typography>
                        </MediaQuery>
                        <MediaQuery query="(max-device-width: 799px)">
                            <Typography gutterBottom variant="headline" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                { this.props.locale["your-hashrate"] } | <code> {this.state.hashrate} H/s </code>
                            </Typography>
                            <Typography gutterBottom variant="headline" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                {this.props.locale["your-workers"]} | <code> {this.state.workers} {this.state.workers > 1 ? this.props.locale.workers : this.props.locale.worker} </code>
                            </Typography>
                            <Typography gutterBottom variant="headline" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                { this.props.locale["total-earned"] } | <code> {this.state.totalPaid} HYC </code>
                            </Typography>
                            <Typography gutterBottom variant="headline" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                {this.props.locale["current-fee"]} | <code> {this.state.currentFee}% </code>
                                <IconButton style={{ fontSize: 8, color: "#fff" }} onClick={this.handleChange}>
                                    <InfoIcon />
                                </IconButton>
                            </Typography>
                        </MediaQuery>

                        <Collapse in={this.state.opened}>
                            <Typography gutterBottom style={{ color: "#fff", fontFamily: this.props.font }}>
                                {this.props.locale["fee-info"]}
                            </Typography>
                        </Collapse>
                    </Grid>
                    <Grid item xs={12} style={{ paddingBottom: "5%", margin: "auto 4%", color: "#FFF", fontFamily: this.props.font }}>
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
                </Grid >
                <Grid container style={{ paddingBottom: "4vh" }}>
                    <Card style={{ margin: "auto auto", width: "100%", overflow: "auto" }}>
                        <CardContent style={{ minHeight: "6vh", background: "linear-gradient(45deg, #ca002e 0%,#8e29b3 62%,#fcb2d5 100%)", paddingBottom: 0 }}>
                            <Typography style={{ fontSize: "1em", color: "#fff", fontFamily: this.props.font, fontWeight: 600, margin: "auto 0" }}>
                                { this.props.locale["table-shares"] }
                            </Typography>
                        </CardContent>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{ this.props.locale["table-timestamp"] }</TableCell>
                                    <TableCell numeric>{this.props.locale["table-to"]}</TableCell>
                                    <TableCell numeric>{this.props.locale["table-txid"]}</TableCell>
                                    <TableCell numeric>{this.props.locale["table-amount"]}</TableCell>
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
                                            <TableCell numeric style={{ textOverflow: "ellipsis" }}>
                                                <code>{payout.txid}</code>
                                            </TableCell>
                                            <TableCell numeric>
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
            </div >
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

        const dataSample = response.minerData.filter((x) => Date.parse(x.timestamp) > (Date.now() - 600000))
        let totalHashes = 0
        for (const row of dataSample) {
            totalHashes = totalHashes + Number(row.valid_hashes) + Number(row.pending_hashes) + Number(row.stale_hashes)
        }

        const timeBegin = this.timestampToSeconds(dataSample[0].timestamp)
        const timeEnd = this.timestampToSeconds(dataSample[dataSample.length - 1].timestamp)

        if (timeBegin !== timeEnd) {
            this.setState({ hashrate: (totalHashes / Math.abs(timeBegin - timeEnd)).toFixed(4) })
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
