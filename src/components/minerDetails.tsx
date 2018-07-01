import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Grid from "@material-ui/core/Grid"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Tooltip from "@material-ui/core/Tooltip"
import Typography from "@material-ui/core/Typography"
import * as React from "react"
import { Component } from "react"
// import Paper from '@material-ui/core/Paper';
import MediaQuery from "react-responsive"
// tslint:disable-next-line:no-var-requires
const WebFont = require("webfontloader")

WebFont.load({
    google: {
      families: ["Open Sans:400,600,700,800"],
    },
})

interface IMinerProps {
    hash: string
}

interface IMinerDetailsState {
    hash: string
    id: string,
    hashrate: number,
    unpaid: number,
    shares: number,
    payouts: [{ block: string, txHash: string, amount: number }],
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
            payouts: [{ block: "", txHash: "", amount: 0 }],
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
                        <Typography style={{ fontFamily: "Open Sans", fontWeight: 600 }}>
                            Hello...
                        </Typography>
                        <Tooltip id="payout-addr" title="Your Payout Address" placement="bottom-start">
                            <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: "Open Sans", fontWeight: 700, wordWrap: "break-word" }}>
                                {this.state.hash}
                            </Typography>
                        </Tooltip>
                    </Grid>
                </Grid>
                <Grid container
                    style={{
                        minHeight: "30vh",
                        backgroundColor: "#000",
                    }}>
                    <Grid item xs={12} style={{ padding: "5% 0", margin: "auto 4%"}}>
                        <MediaQuery query="(min-device-width: 800px)">
                            <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: "Open Sans", fontWeight: 600 }}>
                                Your Hashrate | <code> {this.state.hashrate} H/s </code>
                            </Typography>
                            <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: "Open Sans", fontWeight: 600 }}>
                                Unpaid Balance | <code> {this.state.unpaid} HYC </code>
                            </Typography>
                            <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: "Open Sans", fontWeight: 600 }}>
                                Total Shares | <code> {this.state.shares} </code>
                            </Typography>
                        </MediaQuery>
                        <MediaQuery query="(max-device-width: 799px)">
                            <Typography gutterBottom variant="headline" style={{ color: "#fff", fontFamily: "Open Sans", fontWeight: 600 }}>
                                Your Hashrate | <code> {this.state.hashrate} H/s </code>
                            </Typography>
                            <Typography gutterBottom variant="headline" style={{ color: "#fff", fontFamily: "Open Sans", fontWeight: 600 }}>
                                Unpaid Balance | <code> {this.state.unpaid} HYC </code>
                            </Typography>
                            <Typography gutterBottom variant="headline" style={{ color: "#fff", fontFamily: "Open Sans", fontWeight: 600 }}>
                                Total Shares | <code> {this.state.shares} </code>
                            </Typography>
                        </MediaQuery>
                    </Grid>
                </Grid>
                <Grid container style={{ paddingBottom: "5vh" }}>
                    <Card style={{ margin: "auto auto", width: "100%", overflow: "auto" }}>
                        <CardContent style={{ minHeight: "6vh", background: "linear-gradient(45deg, #ca002e 0%,#8e29b3 62%,#fcb2d5 100%)", paddingBottom: 0 }}>
                            <Typography style={{ fontSize: "1em", color: "#fff", fontFamily: "Open Sans", fontWeight: 600, margin: "auto 0" }}>
                                Shares
                            </Typography>
                        </CardContent>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Block</TableCell>
                                    {/* <TableCell numeric>Address</TableCell>
                                    <TableCell numeric>Hashes</TableCell> */}
                                    <TableCell numeric>Transaction ID</TableCell>
                                    <TableCell numeric>Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.payouts.map( (payout) => {
                                    return (
                                        <TableRow>
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
            </div>
        )
    }
}
