import * as React from 'react';
import { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
// import Paper from '@material-ui/core/Paper';
const WebFont = require('webfontloader');


WebFont.load({
    google: {
      families: ['Open Sans:400,600,700,800']
    }
});

export class PoolDetails extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
        }
    }

    public render() {
        return(
            <div style={{overflow: "hidden" }}>
                <Grid container
                    style={{ 
                        height: "60vh",
                        background: "linear-gradient(45deg, #484fc1 0%,#01a6ea 57%,#00e9ed 100%)"
                    }}>                    
                    <Grid item xs={12} style={{ margin: "auto 4%"}}>
                        <Typography gutterBottom style={{ fontSize: "6em", color: "#fff", fontFamily: "Open Sans", fontWeight: 700 }}>
                            welcome to hyconpool.
                        </Typography>
                        <Typography style={{ fontFamily: "Open Sans", fontWeight: 600 }}>
                            The first, high performance HYCON pool. Instant payouts, anonymous mining, accurate hashrate reporting, all on an efficient mining engine.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container
                    style={{
                        minHeight: "30vh",
                        backgroundColor: "#000",
                    }}>
                    <Grid item xs={12} style={{ padding: "5% 0", margin: "auto 4%"}}>
                        <Typography gutterBottom style={{ fontSize: "2em", color: "#fff", fontFamily: "Open Sans", fontWeight: 600 }}>
                            Hashrate | <code> 10000 Th/s </code>
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "2em", color: "#fff", fontFamily: "Open Sans", fontWeight: 600 }}>
                            Active Miners | <code> 53423 </code>
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "2em", color: "#fff", fontFamily: "Open Sans", fontWeight: 600 }}>
                            Blocks / Hour | <code> 38 </code>
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "2em", color: "#fff", fontFamily: "Open Sans", fontWeight: 600 }}>
                            Last Mined Block | <code> 11983 (2 min ago) </code>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container
                    style={{
                        minHeight: "50vh",
                    }}>
                    <Card style={{ margin: "auto auto", minWidth: "50%" }}>
                        <CardContent style={{ minHeight: "6vh", background: "linear-gradient(45deg, #8f44a1 0%,#4a34b2 42%,#99459a 100%)", paddingBottom: 0 }}>
                            <Typography style={{ fontSize: "1em", color: "#fff", fontFamily: "Open Sans", fontWeight: 600, margin: "auto 0" }}>
                                How to Connect
                            </Typography>
                        </CardContent>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 600 }}>
                                        Server
                                    </TableCell>
                                    <TableCell numeric>
                                        <code>testnet</code>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 600 }}>
                                        Stratum Port
                                    </TableCell>
                                    <TableCell numeric>
                                        <code>8041</code>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 600 }}>
                                        Username
                                    </TableCell>
                                    <TableCell numeric>
                                        <code>Your Hycon Wallet Address</code>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 600 }}>
                                        Password
                                    </TableCell>
                                    <TableCell numeric>
                                        <code>Leave Empty</code>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>
                </Grid>
            </div>
        )
    }
}