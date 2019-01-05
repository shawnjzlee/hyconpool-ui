import { Divider } from "@material-ui/core"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import { Theme } from "@material-ui/core/styles/createMuiTheme"
import createStyles from "@material-ui/core/styles/createStyles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Typography from "@material-ui/core/Typography"
import * as React from "react"
import { Component } from "react"
// tslint:disable:no-var-requires
const endpoint = require("../data/endpoints.json")

const styles = (theme: Theme) => createStyles({
    tableWrapper: {
        overflowX: "auto",
    },
})

class PoolDetails extends Component<any, any> {
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
                <Grid item xs={12} style={{ maxWidth: window.matchMedia("(max-width: 600px)").matches ? "calc(100% - 40px)" : "", margin: window.matchMedia("(max-width: 600px)").matches ? 20 : 60 }}>
                    <Typography gutterBottom variant="h2">
                        {this.props.locale["pool-details-title"]}
                    </Typography>
                    <Typography gutterBottom variant="body2" style={{ textAlign: "justify" }}>
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
                                    <TableCell align="right"><Typography variant={window.matchMedia("(max-width: 600px").matches ? "h5" : "h4"}><code>{this.state.hashrate}</code><span style={{ fontSize: 12 }}>&nbsp;H/s</span></Typography></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">{this.props.locale["active-miners"]}</TableCell>
                                    <TableCell align="right"><Typography variant={window.matchMedia("(max-width: 600px").matches ? "h5" : "h4"}><code>{this.state.miners}</code></Typography></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">{this.props.locale["blocks-hour"]}</TableCell>
                                    <TableCell align="right"><Typography variant={window.matchMedia("(max-width: 600px").matches ? "h5" : "h4"}><code>{this.state.blocks}</code></Typography></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">{this.props.locale["last-mined"]}</TableCell>
                                    <TableCell align="right"><Typography variant={window.matchMedia("(max-width: 600px").matches ? "body2" : "h4"} noWrap><code>{this.state.lastblock === "" ? "None" : this.state.lastblock.substring(0, 14)}...</code></Typography></TableCell>
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
                        <div className={this.props.classes.tableWrapper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{ this.props.locale["table-timestamp"] }</TableCell>
                                        <TableCell align="right">{this.props.locale["table-block"]}</TableCell>
                                        <TableCell align="right">Payees</TableCell>
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
                                                <TableCell>
                                                    <code>{minedBlock.contributors}</code>
                                                </TableCell>
                                            </TableRow>
                                        )})
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                </Grid>
            </Grid>
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

export default withStyles(styles, { withTheme: true })(PoolDetails)
