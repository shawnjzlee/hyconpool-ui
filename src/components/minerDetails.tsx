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
import { IText } from "../locales/locales"
// tslint:disable-next-line:no-var-requires
const WebFont = require("webfontloader")
// tslint:disable-next-line:no-var-requires
const {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend}  = require("recharts")

// TODO: step through and find/fix missing data in fetch
const data = [
    {name: "04:00", uv: 4000, pv: 2400, amt: 2400},
    {name: "05:00", uv: 3000, pv: 1398, amt: 2210},
    {name: "06:00", uv: 2000, pv: 9800, amt: 2290},
    {name: "07:00", uv: 50000, pv: 100, amt: 50000},
    {name: "08:00", uv: 0, pv: 0, amt: 0},
    {name: "09:00", uv: 2390, pv: 3800, amt: 2500},
    {name: "10:00", uv: 3490, pv: 4300, amt: 2100},
    {name: "11:00", uv: 3490, pv: 4300, amt: 2100},
    {name: "13:00", uv: 15000, pv: 4300, amt: 15023},
    {name: "14:00", uv: 3490, pv: 4300, amt: 2100},
    {name: "15:00", uv: 3490, pv: 4300, amt: 2100},
    {name: "16:00", uv: 3490, pv: 4300, amt: 2100},
]

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
    public mounted: boolean = false
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
        this.mounted = false
    }

    public componentDidMount() {
        this.mounted = true
        const url = "http://localhost:3004/users/" + this.state.hash
        fetch(url).then((res) => res.json()).then((user) => {
            console.log(this.state.hash)
            console.log(user)
            this.setState({ id: user.id })
            this.setState({ hashrate: user.hashrate })
            this.setState({ unpaid: user.unpaid_bal })
            this.setState({ shares: user.shares })
            this.setState({ payouts: user.payouts })
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
                    <Grid item xs={12} style={{ padding: "5% 0", margin: "auto 4%" }}>
                        <LineChart  width={730} height={250} data={data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                      </LineChart>
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
