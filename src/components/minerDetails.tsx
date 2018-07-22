import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CircularProgress from "@material-ui/core/CircularProgress"
import Grid from "@material-ui/core/Grid"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableFooter from "@material-ui/core/TableFooter"
import TableHead from "@material-ui/core/TableHead"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import TooltipUI from "@material-ui/core/Tooltip"
import Typography from "@material-ui/core/Typography"
import * as React from "react"
import { Component } from "react"
// import Paper from '@material-ui/core/Paper';
import MediaQuery from "react-responsive"
import { ResponsiveContainer } from "recharts"
import { IText } from "../locales/locales"
// tslint:disable-next-line:no-var-requires
const WebFont = require("webfontloader")
// tslint:disable-next-line:no-var-requires
const {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend}  = require("recharts")

WebFont.load({
    google: {
      families: ["Open Sans:400,600,700,800"],
    },
})

interface IMinerProps {
    hash: string
    locale: IText
    font: string
}

interface IMinerDetailsState {
    hash: string
    workers: number,
    hashrate: number,
    shares: number,
    mounted: boolean,
    page: number,
    rowsPerPage: number,
}

export class MinerDetails extends Component<IMinerProps, IMinerDetailsState> {
    private hashStats: any = []
    private payouts: any = []
    constructor(props: any) {
        super(props)
        this.state = {
            hash: props.hash,
            workers: 0,
            hashrate: 0,
            shares: 0,
            mounted: false,
            page: 0,
            rowsPerPage: 10,
        }
    }

    public async componentWillMount() {
        const url = "http://localhost:3004/" + this.state.hash
        const response = await fetch(url)
        const result = await response.json()

        for (const stat of result.minerData) {
            stat.timestamp = stat.timestamp.split("T")[1].slice(0, 5)
            stat.workers = +stat.workers
            stat.valid_hashes = +stat.valid_hashes
            stat.stale_hashes = +stat.stale_hashes
            stat.pending_hashes = +stat.pending_hashes
            this.hashStats.push(stat)
        }
        for (const payout of result.minerPayouts) {
            payout.timestamp = payout.timestamp.replace("T", " ").substring(0, 19)
            payout.paidAmount = +payout.paidAmount / 1000000000
            this.payouts.push(payout)
        }
        console.log(result.minerPayouts)
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
                            // TODO: hashrate, workers, shares, payout
                            <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                { this.props.locale["your-hashrate"] } | <code> {this.state.hashrate} H/s </code>
                            </Typography>
                            <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                {this.props.locale["your-workers"]} | <code> {this.state.workers} </code>
                            </Typography>
                            <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                { this.props.locale["total-shares"] } | <code> {this.state.shares} </code>
                            </Typography>
                        </MediaQuery>
                        <MediaQuery query="(max-device-width: 799px)">
                            <Typography gutterBottom variant="headline" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                { this.props.locale["your-hashrate"] } | <code> {this.state.hashrate} H/s </code>
                            </Typography>
                            <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                {this.props.locale["your-workers"]} | <code> {this.state.workers} </code>
                            </Typography>
                            <Typography gutterBottom variant="headline" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                { this.props.locale["total-shares"] } | <code> {this.state.shares} </code>
                            </Typography>
                        </MediaQuery>
                    </Grid>
                    <Grid item xs={12} style={{ paddingBottom: "5%", margin: "auto 4%", color: "#FFF", fontFamily: this.props.font }}>
                        { this.state.mounted ?
                            <ResponsiveContainer width="95%" height={300}>
                                <LineChart data={this.hashStats}
                                    margin={{ bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="timestamp" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="valid_hashes" stroke="#18FFFF" />
                                    <Line type="monotone" dataKey="stale_hashes" stroke="#E0E0E0" />
                                    <Line type="monotone" dataKey="pending_hashes" stroke="#FFF176" />
                                </LineChart>
                            </ResponsiveContainer> :
                            <CircularProgress />
                        }
                        {/* <ResponsiveContainer width="95%" height={300}>
                            <LineChart data={info}
                                margin={{ top: 30, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer> */}
                    </Grid>
                </Grid >
                <Grid container style={{ paddingBottom: "5vh" }}>
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
                                    <TableCell numeric>{ this.props.locale["table-txid"] }</TableCell>
                                    <TableCell numeric>{ this.props.locale["table-amount"] }</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { this.payouts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((payout: any) => {
                                    return (
                                        <TableRow key={payout.block}>
                                            <TableCell style={{ fontWeight: 600 }}>
                                                {payout.timestamp}
                                            </TableCell>
                                            <TableCell numeric>
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
}
