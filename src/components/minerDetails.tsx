import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Grid from "@material-ui/core/Grid"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
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

// // TODO: step through and find/fix missing data in fetch
// const info = [
//     {name: "04:00", uv: 4000, pv: 2400},
//     {name: "05:00", uv: 3000, pv: 1398},
//     {name: "06:00", uv: 2000, pv: 9800},
//     {name: "07:00", uv: 50000, pv: 1000},
//     {name: "08:00", uv: 0, pv: 0},
//     {name: "09:00", uv: 2390, pv: 3800},
//     {name: "10:00", uv: 3490, pv: 4300},
//     {name: "11:00", uv: 3490, pv: 4300},
//     {name: "13:00", uv: 15000, pv: 4300},
//     {name: "14:00", uv: 3490, pv: 4300},
//     {name: "15:00", uv: 3490, pv: 4300},
//     {name: "16:00", uv: 3490, pv: 4300},
// ]

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
    id: string,
    hashrate: number,
    unpaid: number,
    shares: number,
    payouts: [{ id: number, block: string, txHash: string, amount: number }],
}

export class MinerDetails extends Component<IMinerProps, IMinerDetailsState> {
    private data: any = []
    constructor(props: any) {
        super(props)
        this.state = {
            hash: props.hash,
            id: "",
            hashrate: 0,
            unpaid: 0,
            shares: 0,
            payouts: [{ id: 0, block: "", txHash: "", amount: 0 }],
        }
    }

    public componentWillMount() {
        const url = "http://localhost:3004/minerData" // + this.state.hash
        fetch(url).then((res) => res.json()).then((stats) => {
            for (const stat of stats) {
                stat.timestamp = stat.timestamp.split("T")[1].slice(0, 5)
                stat.workers = +stat.workers
                stat.valid_hashes = +stat.valid_hashes
                stat.stale_hashes = +stat.stale_hashes
                stat.pending_hashes = +stat.pending_hashes
                this.data.push(stat)
            }
            console.log(this.data)
        }).catch((e: Error) => {
            alert(e)
        })
    }

    public render() {
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
                            // TODO: hashrate, workers, shares, payout, unpaidbalance
                            <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                { this.props.locale["your-hashrate"] } | <code> {this.state.hashrate} H/s </code>
                            </Typography>
                            <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                { this.props.locale["unpaid-balance"] } | <code> {this.state.unpaid} HYC </code>
                            </Typography>
                            <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                { this.props.locale["total-shares"] } | <code> {this.state.shares} </code>
                            </Typography>
                        </MediaQuery>
                        <MediaQuery query="(max-device-width: 799px)">
                            <Typography gutterBottom variant="headline" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                { this.props.locale["your-hashrate"] } | <code> {this.state.hashrate} H/s </code>
                            </Typography>
                            <Typography gutterBottom variant="headline" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                { this.props.locale["unpaid-balance"] } | <code> {this.state.unpaid} HYC </code>
                            </Typography>
                            <Typography gutterBottom variant="headline" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                { this.props.locale["total-shares"] } | <code> {this.state.shares} </code>
                            </Typography>
                        </MediaQuery>
                    </Grid>
                    <Grid item xs={12} style={{ paddingBottom: "5%", margin: "auto 4%", color: "#FFF", fontFamily: this.props.font }}>
                        <ResponsiveContainer width="95%" height={300}>
                            <LineChart data={this.data}
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
                        </ResponsiveContainer>
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
                                    <TableCell>{ this.props.locale["table-block"] }</TableCell>
                                    <TableCell numeric>{ this.props.locale["table-txid"] }</TableCell>
                                    <TableCell numeric>{ this.props.locale["table-amount"] }</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.payouts.slice(0, 25).map( (payout) => {
                                    return (
                                        <TableRow key={payout.block}>
                                            <TableCell style={{ fontWeight: 600 }}>
                                                {payout.block}
                                            </TableCell>
                                            <TableCell numeric>
                                                <code>{payout.txHash}</code>
                                            </TableCell>
                                            <TableCell numeric>
                                                <code>{payout.amount}</code>
                                            </TableCell>
                                        </TableRow>
                                    )})
                                }
                            </TableBody>
                        </Table>
                    </Card>
                </Grid>
            </div >
        )
    }
}
