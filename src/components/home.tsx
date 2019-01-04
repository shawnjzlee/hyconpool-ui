import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import { Theme } from "@material-ui/core/styles/createMuiTheme"
import createStyles from "@material-ui/core/styles/createStyles"
import Typography from "@material-ui/core/Typography"
import * as React from "react"
import { Component } from "react"
import { Link } from "react-router-dom"
// tslint:disable:no-var-requires

const styles = (theme: Theme) => createStyles({
    button: {
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        color: "white",
        maxWidth: "150px",
        width: "100%",
        marginTop: theme.spacing.unit,
    },
})
class Home extends Component<any, any> {
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
        this.setState({ mounted: true })
    }

    public render() {
        return (
            <Grid container style={{ flexGrow: 1 }}>
                <Grid item xs={12} style={{ margin: "auto 5%" }}>
                    <Typography gutterBottom variant="h2">
                        {this.props.locale["welcome-title"]}
                    </Typography>
                    <Typography gutterBottom variant="body1">
                        {this.props.locale["welcome-sub"]}
                    </Typography>
                    <Divider style={{ margin: "10px 0" }}/>
                    <Link to="/get-started" style={{ textDecoration: "none" }}>
                        <Button variant="contained" className={this.props.classes.button}>
                            Get Started
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Home)
