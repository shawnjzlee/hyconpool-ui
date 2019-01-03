// import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Collapse from "@material-ui/core/Collapse"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import { withStyles } from "@material-ui/core/styles"
import { Theme } from "@material-ui/core/styles/createMuiTheme"
import createStyles from "@material-ui/core/styles/createStyles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import classnames from "classnames"
import * as React from "react"
import { Component } from "react"

const styles = (theme: Theme) => createStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    expand: {
        transform: "rotate(0deg)",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
        [theme.breakpoints.up("sm")]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    code: {
        padding: 20,
        borderRadius: 5,
        background: "black",
    },
})

class GetStarted extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            expanded: false,
        }
    }

    public async componentDidMount() {
        this.setState({ mounted: true })
    }

    public render() {
        return (
            <Grid container style={{ flexGrow: 1 }}>
                <Grid item xs={12} style={{ margin: "auto 4%" }}>
                    <Card style={{ boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)" }}>
                        <CardContent style={{ padding: 0 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{this.props.locale["instructions-title"]}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">{this.props.locale.server}</TableCell>
                                        <TableCell align="right"><code>minehycon.com</code></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">{this.props.locale["stratum-port"]}</TableCell>
                                        <TableCell align="right"><code>9081</code></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">{this.props.locale.username}</TableCell>
                                        <TableCell align="right"><code>Your Hycon Wallet Address</code></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">{this.props.locale.password}</TableCell>
                                        <TableCell align="right"><code>Your Worker Label<br/>(up to 16 characters)</code></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardActions>
                            <Typography variant="caption" style={{ marginLeft: "auto" }}>More Info</Typography>
                            <IconButton
                                className={classnames(this.props.classes.expand, {
                                    [this.props.classes.expandOpen]: this.state.expanded,
                                })}
                                onClick={this.handleExpandClick}
                                aria-expanded={this.state.expanded}
                                aria-label="Show more"
                            ><ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography gutterBottom>Below is an example of <code>"pools"</code> section of your <code>config.json</code>:</Typography>
                                <CardContent className={this.props.classes.code}>
                                    <Typography style={{ fontFamily: "monospace" }}>"pools": [&#123;</Typography>
                                    <Typography style={{ fontFamily: "monospace" }}>&nbsp;&nbsp;&nbsp;&nbsp;"url": "minehycon.com:9081",</Typography>
                                    <Typography style={{ fontFamily: "monospace" }}>&nbsp;&nbsp;&nbsp;&nbsp;"user": "H3yGUaF38TxQxoFrqCqPdB2pN9jyBHnaj",</Typography>
                                    <Typography style={{ fontFamily: "monospace" }}>&nbsp;&nbsp;&nbsp;&nbsp;"pass": "worker1",</Typography>
                                    <Typography style={{ fontFamily: "monospace" }}>&nbsp;&nbsp;&nbsp;&nbsp;"keepalive": true,</Typography>
                                    <Typography style={{ fontFamily: "monospace" }}>&nbsp;&nbsp;&nbsp;&nbsp;"nicehash": false,</Typography>
                                    <Typography style={{ fontFamily: "monospace" }}>&nbsp;&nbsp;&nbsp;&nbsp;"variant": 1</Typography>
                                    <Typography style={{ fontFamily: "monospace" }}>&#125;]</Typography>
                                </CardContent>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Grid>
            </Grid>
        )
    }

    private handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded })
    }
}

export default withStyles(styles, { withTheme: true })(GetStarted)
