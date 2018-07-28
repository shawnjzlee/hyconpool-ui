import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Grid from "@material-ui/core/Grid"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import Typography from "@material-ui/core/Typography"
import * as React from "react"
import { Component } from "react"
import MediaQuery from "react-responsive"
import TableHead from "../../node_modules/@material-ui/core/TableHead"
// tslint:disable:no-var-requires
const WebFont = require("webfontloader")
const endpoint = require("../data/endpoints.json")

WebFont.load({
    google: {
      families: ["Open Sans:400,600,700,800"],
    },
})

export class PoolDetails extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            hashrate: 0,
            miners: 0,
            blocks: 0,
            lastblock: "",
            minedBlocks: [],
            page: 0,
            rowsPerPage: 10,
        }
    }

    public async componentDidMount() {
        await this.loadData()
        this.setState({ mounted: true })
    }

    public render() {
        return(
            <div style={{overflow: "hidden" }}>
                <Grid container
                    style={{
                        // height: "60vh",
                        padding: "16% 0",
                        background: "linear-gradient(45deg, #484fc1 0%,#01a6ea 57%,#00e9ed 100%)",
                    }}>
                    <Grid item xs={12} style={{ margin: "auto 4%"}}>
                        <MediaQuery query="(min-device-width: 800px)">
                            <Typography gutterBottom variant="display1" style={{ wordWrap: "break-word", color: "#FFEA00", fontFamily: this.props.font, fontWeight: 700 }}>
                                {this.props.locale["welcome-feature"]}
                            </Typography>
                            <Typography gutterBottom variant="display4" style={{ wordWrap: "break-word", color: "#fff", fontFamily: this.props.font, fontWeight: 700 }}>
                                { this.props.locale["welcome-title"] }
                            </Typography>
                            <Typography gutterBottom variant="subheading" style={{ fontFamily: this.props.font, fontWeight: 600 }}>
                                { this.props.locale["welcome-sub"] }
                            </Typography>
                        </MediaQuery>
                        <MediaQuery query="(max-device-width: 799px)">
                            <Typography gutterBottom variant="headline" style={{ wordWrap: "break-word", color: "#FFEA00", fontFamily: this.props.font, fontWeight: 700 }}>
                                {this.props.locale["welcome-feature"]}
                            </Typography>
                            <Typography gutterBottom variant="display2" style={{ wordWrap: "break-word", color: "#fff", fontFamily: this.props.font, fontWeight: 700 }}>
                                { this.props.locale["welcome-title"] }
                            </Typography>
                            <Typography gutterBottom variant="body2" style={{ fontFamily: this.props.font, fontWeight: 600 }}>
                                { this.props.locale["welcome-sub"] }
                            </Typography>
                        </MediaQuery>
                    </Grid>
                </Grid>
                <Grid container
                    style={{
                        minHeight: "30vh",
                        backgroundColor: "#000",
                    }}>
                    <Grid item xs={12} style={{ padding: "5% 0", margin: "auto 4%"}}>
                        <MediaQuery query="(min-device-width: 800px)">
                            <Typography gutterBottom variant="display4" style={{ color: "#5a5a5a", fontFamily: this.props.font, fontWeight: 600 }}>
                                { this.props.locale["pool-details-title"] }
                            </Typography>
                            <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                { this.props.locale.hashrate } | <code> {this.state.hashrate} H/s</code>
                            </Typography>
                            <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                { this.props.locale["active-miners"] } | <code> {this.state.miners} </code>
                            </Typography>
                            <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                { this.props.locale["blocks-hour"] } | <code> {this.state.blocks} </code>
                            </Typography>
                            <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                {this.props.locale["last-mined"]} | <code>{this.state.lastblock.substring(0, 22)}...</code>
                            </Typography>
                        </MediaQuery>
                        <MediaQuery query="(max-device-width: 799px)">
                            <Typography gutterBottom variant="display3" style={{ color: "#5a5a5a", fontFamily: this.props.font, fontWeight: 600 }}>
                                { this.props.locale["pool-details-title"] }
                            </Typography>
                            <Typography gutterBottom variant="subheading" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                {this.props.locale.hashrate} | <code> {this.state.hashrate} H/s</code>
                            </Typography>
                            <Typography gutterBottom variant="subheading" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                {this.props.locale["active-miners"]} | <code> {this.state.miners} </code>
                            </Typography>
                            <Typography gutterBottom variant="subheading" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                {this.props.locale["blocks-hour"]} | <code style={{ overflow: "none" }}> {this.state.blocks}</code>
                            </Typography>
                            <Typography gutterBottom noWrap variant="subheading" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
                                {this.props.locale["last-mined"]} | <code>{this.state.lastblock.substring(0, 10)}...</code>
                            </Typography>
                        </MediaQuery>
                    </Grid>
                </Grid>
                <Grid container style={{ paddingBottom: "4vh" }}>
                    <Card style={{ margin: "auto auto", width: "100%", overflow: "auto" }}>
                        <CardContent style={{ minHeight: "6vh", background: "linear-gradient(45deg, #8f44a1 0%,#4a34b2 42%,#99459a 100%)", paddingBottom: 0 }}>
                            <Typography style={{ fontSize: "1em", color: "#fff", fontFamily: this.props.font, fontWeight: 600, margin: "auto 0" }}>
                                { this.props.locale["table-blocks"] }
                            </Typography>
                        </CardContent>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{ this.props.locale["table-timestamp"] }</TableCell>
                                    <TableCell numeric>{this.props.locale["table-block"]}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { this.state.minedBlocks.map((minedBlock: any) => {
                                    return (
                                        <TableRow key={minedBlock.block} hover>
                                            <TableCell style={{ fontWeight: 600 }}>
                                                {minedBlock.timestamp} UTC
                                            </TableCell>
                                            <TableCell>
                                                <code>{minedBlock.block}</code>
                                            </TableCell>
                                        </TableRow>
                                    )})
                                }
                            </TableBody>
                        </Table>
                    </Card>
                </Grid>
                <Grid container
                    style={{
                        minHeight: "50vh",
                    }}>
                    <Card style={{ margin: "auto auto", minWidth: "50%" }}>
                        <CardContent style={{ minHeight: "50px", background: "linear-gradient(45deg, #8f44a1 0%,#4a34b2 42%,#99459a 100%)", paddingBottom: 0 }}>
                            <Typography style={{ fontSize: "1em", color: "#fff", fontFamily: this.props.font, fontWeight: 600, margin: "auto 0" }}>
                                { this.props.locale["instructions-title"] }
                            </Typography>
                        </CardContent>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 600 }}>
                                        { this.props.locale.server }
                                    </TableCell>
                                    <TableCell numeric>
                                        <code>minehycon.com</code>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 600 }}>
                                        { this.props.locale["stratum-port"] }
                                    </TableCell>
                                    <TableCell numeric>
                                        <code>9081</code>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 600 }}>
                                        { this.props.locale.username }
                                    </TableCell>
                                    <TableCell numeric>
                                        <code>{ this.props.locale["your-wallet"] }</code>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 600 }}>
                                        { this.props.locale.password }
                                    </TableCell>
                                    <TableCell numeric>
                                        <code>{ this.props.locale["your-password"] }</code>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>
                </Grid>
            </div>
        )
    }

    private async loadData() {
        const url = endpoint.pool
        const response = await (await fetch(url)).json()
        this.setState({ hashrate: response.poolData[0].hashrate })
        this.setState({ miners: response.poolData[0].miners })
        this.setState({ blocks: response.blocksPerDay })
        this.setState({ lastblock: response.lastblock })
        this.setState({ minedBlocks: response.minedBlocks })
    }

}
