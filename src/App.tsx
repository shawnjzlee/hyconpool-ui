import AppBar from "@material-ui/core/AppBar"
import Avatar from "@material-ui/core/Avatar"
import CssBaseline from "@material-ui/core/CssBaseline"
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
// import FormControl from "@material-ui/core/FormControl"
import Hidden from "@material-ui/core/Hidden"
import IconButton from "@material-ui/core/IconButton"
import InputBase from "@material-ui/core/InputBase"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import MenuItem from "@material-ui/core/MenuItem"
import Snackbar from "@material-ui/core/Snackbar"
// import Select from "@material-ui/core/Select"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { withStyles } from "@material-ui/core/styles"
import { fade } from "@material-ui/core/styles/colorManipulator"
import { Theme } from "@material-ui/core/styles/createMuiTheme"
import createStyles from "@material-ui/core/styles/createStyles"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import TextField from "@material-ui/core/TextField"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import AddIcon from "@material-ui/icons/Add"
import PaymentIcon from "@material-ui/icons/AttachMoneyOutlined"
import CloseIcon from "@material-ui/icons/CloseOutlined"
import DashboardIcon from "@material-ui/icons/DashboardOutlined"
import HelpIcon from "@material-ui/icons/HelpOutlineOutlined"
import HomeIcon from "@material-ui/icons/HomeOutlined"
import MenuIcon from "@material-ui/icons/Menu"
import NotificationsIcon from "@material-ui/icons/Notifications"
import * as React from "react"
import { Redirect, RouteComponentProps } from "react-router"
import { RouteConfig } from "react-router-config"
import { Link, Route, Switch } from "react-router-dom"
import GetStarted from "./components/getStarted"
import Home from "./components/home"
import { MinerDetails } from "./components/minerDetails"
import { PoolDetails } from "./components/poolDetails"
import { getLocale, IText } from "./locales/locales"
// tslint:disable-next-line:no-var-requires
const endpoint = require("./data/endpoints.json")

const permanentDrawerWidth = 300
const storage = window.localStorage
let temporaryDrawerWidth = window.innerWidth * 0.85
const styles = (theme: Theme) => createStyles({
    root: {
        display: "flex",
        width: "100%",
        overflowX: "hidden",
    },
    appBar: {
        backgroundColor: "black",
        width: "100%",
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    search: {
        "borderRadius": theme.shape.borderRadius,
        "position": "relative",
        "backgroundColor": fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        "marginRight": theme.spacing.unit * 2,
        "marginLeft": 0,
        "width": "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing.unit * 3,
            width: "auto",
        },
    },
    addIcon: {
        width: theme.spacing.unit * 9,
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    inputRoot: {
        color: "inherit",
        width: "100%",
    },
    inputInput: {
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingTop: theme.spacing.unit,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            paddingLeft: theme.spacing.unit * 10,
            width: 600,
        },
    },
    toolbar: theme.mixins.toolbar,
    temporaryDrawerPaper: {
        width: temporaryDrawerWidth,
    },
    permanentDrawerPaper: {
        width: permanentDrawerWidth,
    },
    content: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: permanentDrawerWidth,
        },
    },
})

export const routes: RouteConfig[] = [
    { exact: true, path: "/" },
    { exact: true, path: "/pool-details" },
    { exact: true, path: "/miner/:hash" },
    { exact: true, path: "/get-started" },
]
export class App extends React.Component<any, any> {
    public home: (
        { match }: RouteComponentProps<{}>,
    ) => JSX.Element

    public minerDetails: (
        { match }: RouteComponentProps<{ hash: string }>,
    ) => JSX.Element

    public poolDetails: (
        { match }: RouteComponentProps<{}>,
    ) => JSX.Element

    public getStarted: (
        { match }: RouteComponentProps<{}>,
    ) => JSX.Element

    private locale: IText

    constructor(props: any) {
        super(props)
        this.state = {
            users: [],
            address: "",
            open: false,
            validAddress: 1,
            redirect: false,
            language: navigator.language.split("-")[0],
            mobileOpen: false,
        }
        this.home = ({ match }: RouteComponentProps<{}>) => (
            <Home locale={this.locale} />
        )
        this.poolDetails = ({ match }: RouteComponentProps<{}>) => (
            <PoolDetails locale={this.locale} />
        )
        this.minerDetails = ({ match }: RouteComponentProps<{ hash: string }>) => (
            <MinerDetails hash={match.params.hash} locale={this.locale} />
        )
        this.getStarted = ({ match }: RouteComponentProps<{}>) => (
            <GetStarted locale={this.locale} />
        )
        this.locale = getLocale(navigator.language)
    }

    public componentDidMount() {
    }

    public async searchAddress() {
        const url = endpoint.miner + this.state.address
        if (this.state.address === "") {
            this.setState({ validAddress: 0 })
            return
        } else if (!/^[a-zA-Z0-9]+$/.test(this.state.address)) {
            this.setState({ validAddress: 0, open: true })
            return
        }

        const response = await fetch(url)
        if (response.status === 404) {
            this.setState({ validAddress: 0, open: true })
            return
        }
        this.setState({ validAddress: 2, redirect: true })
        console.log(storage.getItem("address"))
        const addresses = storage.getItem("address") === null ? [] : storage.getItem("address")!.split(",")
        addresses.push(this.state.address)
        storage.setItem("address", Array.from(new Set(addresses)).join(","))
    }

    public renderDrawer() {
        return (
            <List>
                {window.matchMedia("(max-width: 600px)").matches ?
                    null : <div className={this.props.classes.toolbar} />}
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>MH</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Welcome to MineHycon" secondary="Fee starts at 1%"/>
                </ListItem>
                <Link to="/" style={{ textDecoration: "none" }} onClick={() => {this.setState({ address: "", validAddress: 1, redirect: false, mobileOpen: false })}}>
                    <ListItem button>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </Link>
                <Link to="/pool-details" style={{ textDecoration: "none" }} onClick={() => {this.setState({ address: "", validAddress: 1, redirect: false, mobileOpen: false })}}>
                    <ListItem button>
                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                        <ListItemText primary="Pool Dashboard" />
                    </ListItem>
                </Link>
                <ListItem button>
                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                    <ListItemText primary="Miner Dashboard" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><PaymentIcon /></ListItemIcon>
                    <ListItemText primary="Payments" />
                </ListItem>
                <Link to="/get-started" style={{ textDecoration: "none" }} onClick={() => { this.setState({ address: "", validAddress: 1, redirect: false, mobileOpen: false }) }}>
                    <ListItem button>
                        <ListItemIcon><HelpIcon /></ListItemIcon>
                        <ListItemText primary="Getting Started" />
                    </ListItem>
                    <Divider/>
                </Link>
            </List>
        )
    }
    public render() {
        let theme: any
        const typography = {
            fontFamily: this.state.language === "en" ? ["Open Sans", "Helvetica", "sans-serif"].join(",") : ["Nanum Gothic", "Open Sans", "Helvetica", "sans-serif"].join(","),
            useNextVariants: true,
        }

        theme = createMuiTheme({
            palette: {
                type: "dark",
            },
            typography,
        })

        window.onresize = () => {
            temporaryDrawerWidth = window.innerWidth * 0.8
            this.toggleDrawer(false)
        }

        return (
            <MuiThemeProvider theme={theme}>
                <div className={this.props.classes.root}>
                    <CssBaseline />
                    <AppBar position="fixed" className={this.props.classes.appBar}>
                        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.toggleDrawer(true)}
                                className={this.props.classes.menuButton}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography className={this.props.classes.title} variant="h6" color="inherit" noWrap>
                                minehycon
                            </Typography>
                            <div className={this.props.classes.search}>
                                <div className={this.props.classes.addIcon} onClick={this.handleSubmit}>
                                    <AddIcon />
                                </div>
                                <InputBase
                                    placeholder="Add wallet to `My Dashboard`"
                                    value={this.state.address}
                                    onChange={this.handleChange("address")}
                                    onKeyPress={(e: any) => { if (e.key === "Enter") { e.preventDefault(); this.searchAddress() } }}
                                    classes={{
                                        root: this.props.classes.inputRoot,
                                        input: this.props.classes.inputInput,
                                    }}
                                />
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <Hidden xsDown>
                                    <span style={{ paddingRight: theme.spacing.unit }}>
                                        <IconButton color="inherit">
                                            <NotificationsIcon />
                                        </IconButton>
                                    </span>
                                </Hidden>
                                <span>
                                    <TextField select id="language_select" type="language" value={this.state.language} onChange={this.languageChange}>
                                        <MenuItem value={"en"}>EN</MenuItem>
                                        <MenuItem value={"ko"}>KR</MenuItem>
                                    </TextField>
                                </span>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <nav className={this.props.classes.drawer}>
                        {window.matchMedia("(max-width: 600px)").matches ? (
                            <Hidden xsUp implementation="css">
                                <SwipeableDrawer
                                    container={this.props.container}
                                    variant="temporary"
                                    open={this.state.mobileOpen}
                                    onOpen={this.toggleDrawer(true)}
                                    onClose={this.toggleDrawer(false)}
                                    PaperProps={{ style: { width: temporaryDrawerWidth } }}
                                    ModalProps={{
                                        keepMounted: true,
                                    }}
                                >
                                    {this.renderDrawer()}
                                </SwipeableDrawer>
                            </Hidden>
                        ) : (
                            <Hidden xsDown implementation="css">
                                <Drawer
                                    classes={{
                                        paper: this.props.classes.permanentDrawerPaper,
                                    }}
                                    variant="permanent"
                                    open
                                >
                                    {this.renderDrawer()}
                                </Drawer>
                            </Hidden>
                        )}
                    </nav>
                    <main className={this.props.classes.content}>
                        <div className={this.props.classes.toolbar} />
                        <Switch>
                            <Route exact path="/" render={() => (
                                this.state.redirect ?
                                    (<Redirect to={`/miner/${this.state.address}`} />) :
                                    (<Home locale={this.locale} />)
                            )} />
                            <Route exact path="/pool-details" component={this.poolDetails} />
                            <Route exact path="/miner/:hash" component={this.minerDetails} />
                            <Route exact path="/get-started" component={this.getStarted} />
                        </Switch>
                    </main>
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    message={<span id="message-id">{this.locale["error-no-address"]}</span>}
                    action={
                        <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleClose}>
                            <CloseIcon />
                        </IconButton>
                    }
                />
        {/*
                <Paper style={{ position: "fixed", bottom: 0, height: "40px", paddingTop: 10, width: "100%" }}>
                    <Grid container style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Grid item>
                            <a href="https://t.me/minehycon" style={{ flex: 1, textAlign: "left", fontFamily: this.font, textDecoration: "none" }}>
                                <Typography
                                    variant="caption"
                                    color="primary"
                                    style={{ flexBasis: 165, textAlign: "center", fontFamily: this.font, cursor: "pointer" }}
                                >
                                    telegram |
                                </Typography>
                            </a>
                        </Grid>
                        <MediaQuery query="(min-device-width: 800px)">
                            <Grid item>
                                <Typography
                                    variant="caption"
                                    style={{ flexBasis: 165, marginLeft: 5, textAlign: "center", fontFamily: this.font }}
                                >
                                    © minehycon 2018 | hycon-core release: 0.0.8-gregarious-goose
                                </Typography>
                            </Grid>
                        </MediaQuery>
                        <Grid item>
                            <FormControl style={{ flexBasis: 165, marginLeft: 10, textAlign: "center", fontFamily: this.font }}>
                                <Select
                                    value={this.state.language}
                                    onChange={this.languageChange}
                                    inputProps={{
                                        id: "lang_select",
                                        name: "language",
                                    }}
                                    style={{ fontSize: 10, cursor: "pointer" }}
                                    autoWidth
                                >
                                    <MenuItem value={"en"}>EN</MenuItem>
                                    <MenuItem value={"ko"}>KR</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Paper> */}
            </MuiThemeProvider >
        )
    }

    private handleSubmit = () => {
        this.searchAddress()
    }
    // private homePage() {
    //     this.setState({ validAddress: 1 })
    // }

    private handleChange = (prop: any) => (event: any) => {
        event.preventDefault()
        this.setState({ [prop]: event.target.value })
    }

    private handleClose = (event: any) => {
        this.setState({ open: false })
    }

    // private handleRedirect() {
    //     this.setState({ redirect: false })
    // }

    private toggleDrawer = (open: boolean) => () => {
        // console.log("toggleDrawer: " + open)
        this.setState({ mobileOpen: open})
    }
    private languageChange = (event: any) => {
        this.locale = getLocale(event.target.value)
        this.setState({ language: event.target.value })
    }
}

export default withStyles(styles, { withTheme: true })(App)
