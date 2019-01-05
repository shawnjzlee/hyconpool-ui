import { ListSubheader } from "@material-ui/core"
import AppBar from "@material-ui/core/AppBar"
import Avatar from "@material-ui/core/Avatar"
import Collapse from "@material-ui/core/Collapse"
import CssBaseline from "@material-ui/core/CssBaseline"
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import Fade from "@material-ui/core/Fade"
import Hidden from "@material-ui/core/Hidden"
import IconButton from "@material-ui/core/IconButton"
import InputBase from "@material-ui/core/InputBase"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import Paper from "@material-ui/core/Paper"
import Popper from "@material-ui/core/Popper"
import Snackbar from "@material-ui/core/Snackbar"
import { withStyles } from "@material-ui/core/styles"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { fade } from "@material-ui/core/styles/colorManipulator"
import { Theme } from "@material-ui/core/styles/createMuiTheme"
import createStyles from "@material-ui/core/styles/createStyles"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import AddIcon from "@material-ui/icons/Add"
import ArrowForwardIcon from "@material-ui/icons/ArrowForwardOutlined"
import CloseIcon from "@material-ui/icons/CloseOutlined"
import DashboardIcon from "@material-ui/icons/DashboardOutlined"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import HelpIcon from "@material-ui/icons/HelpOutlineOutlined"
import HomeIcon from "@material-ui/icons/HomeOutlined"
import DarkIcon from "@material-ui/icons/InvertColors"
import LightIcon from "@material-ui/icons/InvertColorsOff"
import MenuIcon from "@material-ui/icons/Menu"
import MessageIcon from "@material-ui/icons/MessageOutlined"
import NotificationsIcon from "@material-ui/icons/Notifications"
import * as React from "react"
import { Redirect, RouteComponentProps } from "react-router"
import { RouteConfig } from "react-router-config"
import { Link, Route, Switch } from "react-router-dom"
import GetStarted from "./components/getStarted"
import Home from "./components/home"
import MinerDetails from "./components/minerDetails"
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
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    notification: {
        padding: theme.spacing.unit * 2,
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
            openSnackbar: false,
            anchorEl: undefined,
            openNotification: false,
            validAddress: 1,
            redirect: false,
            language: "en",
            dark: true,
            mobileOpen: false,
            openCollapse: false,
            addressHistory: storage.getItem("address") === null ? [] : storage.getItem("address")!.split(","),
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

        if (this.state.addressHistory[0] === "") {
            this.state.addressHistory.shift()
        }
    }

    public componentDidMount() {
    }

    public async searchAddress() {
        const url = endpoint.miner + this.state.address
        if (this.state.address === "") {
            this.setState({ validAddress: 0 })
            return
        } else if (!/^[a-zA-Z0-9]+$/.test(this.state.address)) {
            this.setState({ validAddress: 0, openSnackbar: true })
            return
        }

        const response = await fetch(url)
        if (response.status === 404) {
            this.setState({ validAddress: 0, openSnackbar: true })
            return
        }
        this.setState({ validAddress: 2, redirect: true })

        const addresses = storage.getItem("address") === null ? [] : storage.getItem("address")!.split(",")
        if (addresses[0] === "") {
            addresses.shift()
        }
        addresses.push(this.state.address)
        this.setState({ addressHistory: addresses })
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
                <ListItem button onClick={this.handleClick}>
                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                    <ListItemText primary="Miner Dashboard" />
                    {this.state.addressHistory.length === 0 ? "" : (this.state.openCollapse ? <ExpandLess style={{ color: "white" }}/> : <ExpandMore style={{ color: "white" }}/>)}
                </ListItem>
                <Collapse in={this.state.openCollapse} style={{ backgroundColor: "gray" }} timeout="auto" unmountOnExit>
                    <List disablePadding>
                        {this.state.addressHistory.map((address: string) =>
                            <Link to={`/miner/${address}`} style={{ textDecoration: "none" }}>
                                <ListItem button key={address} className={this.props.classes.nested}>
                                    <ListItemText
                                        inset
                                        disableTypography
                                        primary={<Typography noWrap variant={"caption"}>{address}</Typography>}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton key={address} onClick={this.handleDelete(address)}><CloseIcon/></IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </Link>,
                        )}
                    </List>
                </Collapse>
                <Link to="/get-started" style={{ textDecoration: "none" }} onClick={() => { this.setState({ address: "", validAddress: 1, redirect: false, mobileOpen: false }) }}>
                    <ListItem button>
                        <ListItemIcon><HelpIcon /></ListItemIcon>
                        <ListItemText primary="Getting Started" />
                    </ListItem>
                    <Divider/>
                </Link>
                <ListItem button component="a" target="_blank" href="https://t.me/minehycon">
                    <ListItemIcon><MessageIcon /></ListItemIcon>
                    <ListItemText primary="Join Our Telegram" />
                </ListItem>
                <Divider />
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
            overrides: {
                MuiListItem: {
                    root: {
                        paddingTop: 15,
                        paddingBottom: 15,
                    },
                },
            },
            palette: {
                type: this.state.dark ? "dark" : "light",
            },
            typography,
        })

        window.onresize = () => {
            temporaryDrawerWidth = window.innerWidth * 0.8
            this.toggleDrawer(false)
        }

        const id = this.state.openNotification ? "notification-popper" : undefined

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
                                    endAdornment={
                                        <IconButton color="inherit" aria-label="Enter" onClick={this.handleSubmit}>
                                            <ArrowForwardIcon />
                                        </IconButton>
                                    }
                                />
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <Hidden xsDown>
                                    <span style={{ paddingRight: theme.spacing.unit }}>
                                        <IconButton aria-describedby={id} color="inherit" onClick={this.handleNotification}>
                                            <NotificationsIcon />
                                        </IconButton>
                                    </span>
                                </Hidden>
                                <span>
                                    <IconButton color="inherit" onClick={() => {this.setState({ dark: !this.state.dark })}}>
                                        {this.state.dark ? <DarkIcon /> : <LightIcon />}
                                    </IconButton>
                                    {/* <TextField select id="language_select" type="language" value={this.state.language} onChange={this.languageChange}>
                                        <MenuItem value={"en"}>EN</MenuItem>
                                        <MenuItem value={"ko"}>KR</MenuItem>
                                    </TextField> */}
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
                                    classes={{ paper: this.props.classes.permanentDrawerPaper }}
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
                            <Route exact path="/pool-details" render={() => (
                                this.state.redirect ?
                                    (<Redirect to={`/miner/${this.state.address}`} />) :
                                    (<PoolDetails locale={this.locale} />)
                            )} />
                            <Route exact path="/miner/:hash" component={this.minerDetails} />
                            <Route exact path="/get-started" render={() => (
                                this.state.redirect ?
                                    (<Redirect to={`/miner/${this.state.address}`} />) :
                                    (<GetStarted locale={this.locale} />)
                            )} />
                            {/* <Route exact path="/pool-details" component={this.poolDetails} />
                            <Route exact path="/miner/:hash" component={this.minerDetails} />
                            <Route exact path="/get-started" component={this.getStarted} /> */}
                        </Switch>
                    </main>
                </div>
                <Popper id={id} open={this.state.openNotification} anchorEl={this.state.anchorEl} style={{ zIndex: 999999 }} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper>
                                <List dense subheader={<ListSubheader component="div">News &amp; Notifications</ListSubheader>}>
                                    <ListItem>
                                        <ListItemText primary="Brand new dashboard!" secondary="Jan. 6, '19" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Maintenance: Payout stability upgrades" secondary="Dec. 27, '18" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Update: Using hycon-core v0.2.0" secondary="Dec. 6, '18" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Update: Starting fee decreased to 1%" secondary="Nov. 28, '18" />
                                    </ListItem>
                                </List>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    open={this.state.openSnackbar}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    message={<span id="message-id">{this.locale["error-no-address"]}</span>}
                    action={
                        <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleClose}>
                            <CloseIcon />
                        </IconButton>
                    }
                />
            </MuiThemeProvider >
        )
    }

    private handleSubmit = () => {
        this.searchAddress()
    }

    private handleDelete = (deleteAddress: string) => () => {
        console.log(deleteAddress)
        const tmp = this.state.addressHistory.filter((address: string) => address !== deleteAddress)
        storage.setItem("address", Array.from(new Set(tmp)).join(","))
        this.setState({ addressHistory: tmp })
    }
    private handleClick = () => {
        this.setState({ openCollapse: !this.state.openCollapse })
    }
    private handleChange = (prop: any) => (event: any) => {
        event.preventDefault()
        this.setState({ [prop]: event.target.value })
    }

    private handleClose = (event: any) => {
        this.setState({ openSnackbar: false })
    }

    private handleNotification = (event: any) => {
        const { currentTarget } = event
        this.setState({
            anchorEl: currentTarget,
            openNotification: !this.state.openNotification,
        })
    }

    private toggleDrawer = (open: boolean) => () => {
        this.setState({ mobileOpen: open})
    }
    // private languageChange = (event: any) => {
    //     this.locale = getLocale(event.target.value)
    //     this.setState({ language: event.target.value })
    // }
}

export default withStyles(styles, { withTheme: true })(App)
