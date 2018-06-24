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
import Tooltip from '@material-ui/core/Tooltip';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab/Tab';
import TableHead from '@material-ui/core/TableHead';
// import Paper from '@material-ui/core/Paper';
import MediaQuery from 'react-responsive';
const WebFont = require('webfontloader');

WebFont.load({
    google: {
      families: ['Open Sans:400,600,700,800']
    }
});

// const styles = {
//     grid: {
//         padding: {
//             margin: "2em 1em",
//             width: "96%",
//         },
//     },
//     tabs: {
//         maxWidth: 9999,
//         background: "#fff",
//     }
// }

// function TabContainer(props: any) {
//     return (
//         <Typography component="div" style={{ padding: 8 * 3 }}>
//             {props.children}
//         </Typography>
//     )
// }

export class MinerDetails extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            value: 0
        }
    }
    
    public handleChangeTab = (event: any, value: any) => {
        this.setState({ value })
    }

    public render() {
        return(
            <div style={{overflow: "hidden" }}>
                <Grid container
                    style={{ 
                        height: "40vh",
                        background: "linear-gradient(122deg, #e5676b 0%,#fac84d 39%,#f6ac4b 100%)"
                    }}>                    
                    <Grid item xs={12} style={{ margin: "auto 4%"}}>                    
                        <Typography style={{ fontFamily: "Open Sans", fontWeight: 600 }}>
                            Hello...
                        </Typography>
                        <Tooltip id="payout-addr" title="Your Payout Address" placement="bottom-start">
                            <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: "Open Sans", fontWeight: 700, wordWrap: "break-word" }}>
                                H4FPn4X1RfR9RQtmFzY6BRozUAfoR3Ejp
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
                                Your Hashrate | <code> 10000 Th/s </code>
                            </Typography>
                            <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: "Open Sans", fontWeight: 600 }}>
                                Unpaid Balance | <code> 1234 HYC </code>
                            </Typography>
                            <Typography gutterBottom variant="display1" style={{ color: "#fff", fontFamily: "Open Sans", fontWeight: 600 }}>
                                Total Shares | <code> 1,647 (2%) </code>
                            </Typography>
                        </MediaQuery>
                        <MediaQuery query="(max-device-width: 799px)">
                            <Typography gutterBottom variant="headline" style={{ color: "#fff", fontFamily: "Open Sans", fontWeight: 600 }}>
                                Your Hashrate | <code> 10000 Th/s </code>
                            </Typography>
                            <Typography gutterBottom variant="headline" style={{ color: "#fff", fontFamily: "Open Sans", fontWeight: 600 }}>
                                Unpaid Balance | <code> 1234 HYC </code>
                            </Typography>
                            <Typography gutterBottom variant="headline" style={{ color: "#fff", fontFamily: "Open Sans", fontWeight: 600 }}>
                                Total Shares | <code> 1,647 (2%) </code>
                            </Typography>
                        </MediaQuery>
                    </Grid>
                </Grid>
                <Grid container style={{ paddingBottom: "5vh" }}>
                    <Card style={{ margin: "auto auto", width: "100%", overflow: 'auto' }}>
                        <CardContent style={{ minHeight: "6vh", background: "linear-gradient(45deg, #ca002e 0%,#8e29b3 62%,#fcb2d5 100%)", paddingBottom: 0 }}>
                            <Typography style={{ fontSize: "1em", color: "#fff", fontFamily: "Open Sans", fontWeight: 600, margin: "auto 0" }}>
                                Shares
                            </Typography>
                        </CardContent>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Block</TableCell>
                                    <TableCell numeric>Address</TableCell>
                                    <TableCell numeric>Hashes</TableCell>
                                    <TableCell numeric>Transaction ID</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 600 }}>
                                        11231
                                    </TableCell>
                                    <TableCell numeric>
                                        <code>testnet</code>
                                    </TableCell>                                    
                                    <TableCell numeric>
                                        <code>testnet</code>
                                    </TableCell>                                    
                                    <TableCell numeric>
                                        <code>testnet</code>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 600 }}>
                                        11230
                                    </TableCell>
                                    <TableCell numeric>
                                        <code>testnet</code>
                                    </TableCell>                                    
                                    <TableCell numeric>
                                        <code>testnet</code>
                                    </TableCell>                                    
                                    <TableCell numeric>
                                        <code>testnet</code>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 600 }}>
                                        11229
                                    </TableCell>
                                    <TableCell numeric>
                                        <code>testnet</code>
                                    </TableCell>                                    
                                    <TableCell numeric>
                                        <code>testnet</code>
                                    </TableCell>                                    
                                    <TableCell numeric>
                                        <code>testnet</code>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 600 }}>
                                        11228
                                    </TableCell>
                                    <TableCell numeric>
                                        <code>testnet</code>
                                    </TableCell>                                    
                                    <TableCell numeric>
                                        <code>testnet</code>
                                    </TableCell>                                    
                                    <TableCell numeric>
                                        <code>testnet</code>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>
                </Grid>
                {/* <Grid container> */}
                    {/* <AppBar position="static">
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChangeTab}
                            indicatorColor="primary"
                            textColor="primary"
                            fullWidth
                            centered
                        >
                            <Tab label={"Active Workers"} style={styles.tabs} />
                            <Tab label={"Recent Payouts"} style={styles.tabs} />
                        </Tabs>
                    </AppBar>
                    {this.state.value === 0 &&
                        <TabContainer style={{ padding: "10% 0%"}}>
                            <Grid container spacing={16} style={styles.grid.padding}>
                                <Table>
                                    Helloworld
                                </Table>
                            </Grid>
                        </TabContainer>}
                    {this.state.value === 1 &&
                        <TabContainer>
                            Item Two

                        </TabContainer>} */}
                {/* </Grid> */}
            </div>
        )
    }
}