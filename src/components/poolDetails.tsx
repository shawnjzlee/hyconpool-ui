// import Card from "@material-ui/core/Card"
// import CardContent from "@material-ui/core/CardContent"
import { Divider } from "@material-ui/core"
import Card from "@material-ui/core/Card"
// import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Grid from "@material-ui/core/Grid"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Typography from "@material-ui/core/Typography"
import * as React from "react"
import { Component } from "react"
// import MediaQuery from "react-responsive"
// import TableHead from "../../node_modules/@material-ui/core/TableHead"
// tslint:disable:no-var-requires
const endpoint = require("../data/endpoints.json")

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
            <Grid container style={{ flexGrow: 1 }}>
                <Grid item xs={12} style={{ margin: "5%" }}>
                    <Typography gutterBottom variant="h2">
                        {this.props.locale["pool-details-title"]}
                    </Typography>
                    <Typography gutterBottom variant="body2">
                        Our servers are located in South Korea. We guarantee stability, transparency, and minimized risk. We provide an easy to use, informative, and user-friendly web interface so that you can always find out information about new blocks and expect a fair contribution calculation.
                    </Typography>
                    <Divider style={{ margin: "20px 0px"}}/>
                    <Typography gutterBottom variant="body1" style={{ fontWeight: 600 }}>
                        MineHycon pool benefits:
                    </Typography>
                    <Typography gutterBottom variant="body2">
                        - Fee starts at 1% <br/>
                        - The longer you mine in the pool, the lower your fee (minimum 0.25%) <br/>
                        - Transparent and detailed statistics <br/>
                        - Extremely stable and protected from DDoS attacks
                    </Typography>

                    <Card style={{ marginTop: "5%", boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)" }}>
                        <CardContent style={{ height: 80, background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)", paddingBottom: 0 }}>
                            <Typography variant="h6">
                                Statistics
                            </Typography>
                        </CardContent>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">{this.props.locale.hashrate}</TableCell>
                                    <TableCell align="right"><Typography variant="h4"><code>{this.state.hashrate}</code><span style={{ fontSize: 12 }}>&nbsp;H/s</span></Typography></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">{this.props.locale["active-miners"]}</TableCell>
                                    <TableCell align="right"><Typography variant="h4"><code>{this.state.miners}</code></Typography></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">{this.props.locale["blocks-hour"]}</TableCell>
                                    <TableCell align="right"><Typography variant="h4"><code>{this.state.blocks}</code></Typography></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">{this.props.locale["last-mined"]}</TableCell>
                                    <TableCell align="right"><Typography variant="h4" noWrap><code>{this.state.lastblock === "" ? "None" : this.state.lastblock}</code></Typography></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>
                    <Card style={{ marginTop: "5%", boxShadow: "0 3px 5px 2px rgba(1, 166, 234, .3)" }}>
                        <CardContent style={{ height: 80, background: "linear-gradient(45deg, #484fc1 0%,#01a6ea 57%,#00e9ed 100%)", paddingBottom: 0 }}>
                            <Typography variant="h6">
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
                                                {minedBlock.timestamp.replace("T", " ").substring(0, 19)}
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
            </Grid>
            // <div style={{ overflow: "hidden" }}>
            //     <Grid container>
            //         <Grid item xs={12} style={{ height: "100%" }}>
            //             <Typography variant="h2">
            //                 pool details
            //             </Typography>
            //         </Grid>
            //     </Grid>
            //     <Grid container
            //         style={{
            //             minHeight: "30vh",
            //             backgroundColor: "#000",
            //         }}>
            //         <Grid item xs={12} style={{ padding: "5% 0", margin: "auto 4%"}}>
            //             <MediaQuery query="(min-device-width: 800px)">
            //                 <Typography gutterBottom variant="display4" style={{ color: "#5a5a5a", fontFamily: this.props.font, fontWeight: 600 }}>
            //                     { this.props.locale["pool-details-title"] }
            //                 </Typography>
            //                 <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
            //                     { this.props.locale.hashrate } | <code> {this.state.hashrate} H/s</code>
            //                 </Typography>
            //                 <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
            //                     { this.props.locale["active-miners"] } | <code> {this.state.miners} </code>
            //                 </Typography>
            //                 <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
            //                     { this.props.locale["blocks-hour"] } | <code> {this.state.blocks} </code>
            //                 </Typography>
            //                 <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
            //                     {this.props.locale["last-mined"]} | <code>{this.state.lastblock.substring(0, 22)}...</code>
            //                 </Typography>
            //             </MediaQuery>
            //             <MediaQuery query="(max-device-width: 799px)">
            //                 <Typography gutterBottom variant="display3" style={{ color: "#5a5a5a", fontFamily: this.props.font, fontWeight: 600 }}>
            //                     { this.props.locale["pool-details-title"] }
            //                 </Typography>
            //                 <Typography gutterBottom variant="subheading" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
            //                     {this.props.locale.hashrate} | <code> {this.state.hashrate} H/s</code>
            //                 </Typography>
            //                 <Typography gutterBottom variant="subheading" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
            //                     {this.props.locale["active-miners"]} | <code> {this.state.miners} </code>
            //                 </Typography>
            //                 <Typography gutterBottom variant="subheading" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
            //                     {this.props.locale["blocks-hour"]} | <code style={{ overflow: "none" }}> {this.state.blocks}</code>
            //                 </Typography>
            //                 <Typography gutterBottom noWrap variant="subheading" style={{ color: "#fff", fontFamily: this.props.font, fontWeight: 600 }}>
            //                     {this.props.locale["last-mined"]} | <code>{this.state.lastblock.substring(0, 10)}...</code>
            //                 </Typography>
            //             </MediaQuery>
            //         </Grid>
            //     </Grid>
            //     <Grid container style={{ paddingBottom: "4vh" }}>
            //         <Card style={{ margin: "auto auto", width: "100%", overflow: "auto" }}>
            //             <CardContent style={{ minHeight: "6vh", background: "linear-gradient(45deg, #484fc1 0%,#01a6ea 57%,#00e9ed 100%)", paddingBottom: 0 }}>
            //                 <Typography style={{ fontSize: "1em", color: "#fff", fontFamily: this.props.font, fontWeight: 600, margin: "auto 0" }}>
            //                     { this.props.locale["table-blocks"] }
            //                 </Typography>
            //             </CardContent>
            //             <Table>
            //                 <TableHead>
            //                     <TableRow>
            //                         <TableCell>{ this.props.locale["table-timestamp"] }</TableCell>
            //                         <TableCell numeric>{this.props.locale["table-block"]}</TableCell>
            //                     </TableRow>
            //                 </TableHead>
            //                 <TableBody>
            //                     { this.state.minedBlocks.map((minedBlock: any) => {
            //                         return (
            //                             <TableRow key={minedBlock.block} hover>
            //                                 <TableCell style={{ fontWeight: 600 }}>
            //                                     {minedBlock.timestamp.replace("T", " ").substring(0, 19)}
            //                                 </TableCell>
            //                                 <TableCell>
            //                                     <code>{minedBlock.block}</code>
            //                                 </TableCell>
            //                             </TableRow>
            //                         )})
            //                     }
            //                 </TableBody>
            //             </Table>
            //         </Card>
            //     </Grid>
            //     <Grid container
            //         style={{
            //             minHeight: "50vh",
            //         }}>
            //         <Card style={{ margin: "auto auto", minWidth: "50%" }}>
            //             <CardContent style={{ minHeight: "50px", background: "linear-gradient(45deg, #8f44a1 0%,#4a34b2 42%,#99459a 100%)", paddingBottom: 0 }}>
            //                 <Typography style={{ fontSize: "1em", color: "#fff", fontFamily: this.props.font, fontWeight: 600, margin: "auto 0" }}>
            //                     { this.props.locale["instructions-title"] }
            //                 </Typography>
            //             </CardContent>
            //             <Table>
            //                 <TableBody>
            //                     <TableRow>
            //                         <TableCell style={{ fontWeight: 600 }}>
            //                             { this.props.locale.server }
            //                         </TableCell>
            //                         <TableCell numeric>
            //                             <code>minehycon.com</code>
            //                         </TableCell>
            //                     </TableRow>
            //                     <TableRow>
            //                         <TableCell style={{ fontWeight: 600 }}>
            //                             { this.props.locale["stratum-port"] }
            //                         </TableCell>
            //                         <TableCell numeric>
            //                             <code>9081</code>
            //                         </TableCell>
            //                     </TableRow>
            //                     <TableRow>
            //                         <TableCell style={{ fontWeight: 600 }}>
            //                             { this.props.locale.username }
            //                         </TableCell>
            //                         <TableCell numeric>
            //                             <code>{ this.props.locale["your-wallet"] }</code>
            //                         </TableCell>
            //                     </TableRow>
            //                     <TableRow>
            //                         <TableCell style={{ fontWeight: 600 }}>
            //                             { this.props.locale.password }
            //                         </TableCell>
            //                         <TableCell numeric>
            //                             <code>{ this.props.locale["your-password"] }</code>
            //                         </TableCell>
            //                     </TableRow>
            //                 </TableBody>
            //             </Table>
            //         </Card>
            //     </Grid>
            // </div>
        )
    }

    private async loadData() {
        const url = endpoint.pool
        const response = await (await fetch(url)).json()
        this.setState({ hashrate:  response.poolData[0].hashrate })
        this.setState({ miners:  response.poolData[0].miners })
        this.setState({ blocks:  response.blocksPerDay })
        this.setState({ lastblock:  response.lastblock })
        this.setState({ minedBlocks:  response.minedBlocks })
    }

}
