import * as React from 'react';
import { Component } from 'react';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import Typography from '@material-ui/core/Typography';
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
            <div>
                <Grid container>
                    <Grid container spacing={8}
                        style={{ 
                            height: "60vh",
                            display: "flex",
                            backgroundColor: "#00d7ee"
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
                </Grid>
                <Grid container spacing={8}>
                    <Table>
                    
                    </Table>
                </Grid>
            </div>
        )
    }
}