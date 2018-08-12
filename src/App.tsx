import { CssBaseline, MenuItem, Select, Snackbar } from "@material-ui/core"
import AppBar from "@material-ui/core/AppBar"
import FormControl from "@material-ui/core/FormControl"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import Input from "@material-ui/core/Input"
import InputAdornment from "@material-ui/core/InputAdornment"
import Paper from "@material-ui/core/Paper"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import CloseIcon from "@material-ui/icons/Close"
import SearchIcon from "@material-ui/icons/Search"
import * as React from "react"
import MediaQuery from "react-responsive"
import { Redirect, RouteComponentProps } from "react-router"
import { RouteConfig } from "react-router-config"
import { Link, Route, Switch } from "react-router-dom"
import { MinerDetails } from "./components/minerDetails"
import { PoolDetails } from "./components/poolDetails"
import { getLocale, IText } from "./locales/locales"
// tslint:disable-next-line:no-var-requires
const endpoint = require("./data/endpoints.json")

// tslint:disable:no-shadowed-variable
export const routes: RouteConfig[] = [
    { exact: true, path: "/" },
    { exact: true, path: "/miner/:hash" },
]
export class App extends React.Component<any, any> {
    public home: (
        { match }: RouteComponentProps<{}>,
    ) => JSX.Element

    public minerDetails: (
        { match }: RouteComponentProps<{ hash: string }>,
    ) => JSX.Element

    private locale: IText
    private font: string

    constructor(props: any) {
        super(props)
        this.state = {
            users: [],
            address: "",
            open: false,
            validAddress: 1,
            redirect: false,
            language: navigator.language.split("-")[0],
        }
        this.home = ({ match }: RouteComponentProps<{}>) => (
            <PoolDetails locale={this.locale} font={this.font} />
        )
        this.minerDetails = ({ match }: RouteComponentProps<{ hash: string }>) => (
            <MinerDetails hash={match.params.hash} locale={this.locale} font={this.font} />
        )
        this.locale = getLocale(navigator.language)
        this.font = (this.state.language === "en" ? "Open Sans" : "Nanum Gothic")
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
    }

    public handleChange = (prop: any) => (event: any) => {
        event.preventDefault()
        this.setState({ [prop]: event.target.value })
    }

    public handleClose = (event: any) => {
        this.setState({ open: false })
    }

    public handleRedirect() {
        this.setState({ redirect: false })
    }

    public homePage() {
        this.setState({ validAddress: 1 })
    }

    public languageChange = (event: any) => {
        this.locale = getLocale(event.target.value)
        this.setState({ [event.target.name]: event.target.value })
    }
    public render() {
        if (this.state.language === "en") {
            this.font = "Open Sans"
        } else {
            this.font = "Nanum Gothic"
        }
        return (
            <div>
                <AppBar position="static" color="default" style={{ flexGrow: 1, justifyContent: "space-between" }}>
                    <Toolbar style={{ display: "flex" }}>
                        <Link to="/" style={{ flex: 1, textAlign: "left", fontFamily: this.font, textDecoration: "none" }}>
                            <Typography
                                variant="title"
                                color="primary"
                                style={{ flexBasis: 165, textAlign: "left", fontFamily: this.font, cursor: "pointer" }}
                                onClick={this.handleRedirect.bind(this)}
                            >
                                minehycon.com
                            </Typography>
                        </Link>
                        <FormControl style={{ flexBasis: "50%" }}>
                            {this.state.validAddress ?
                                <Input
                                    id="address"
                                    type="text"
                                    placeholder={this.locale.address}
                                    value={this.state.address}
                                    onChange={this.handleChange("address")}
                                    fullWidth
                                    onKeyPress={(e: any) => { if (e.key === "Enter") { e.preventDefault(); this.searchAddress() } }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton onClick={this.searchAddress.bind(this)}>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                /> :
                                <Input
                                    error
                                    id="address"
                                    type="text"
                                    placeholder={this.locale.address}
                                    value={this.state.address}
                                    onChange={this.handleChange("address")}
                                    fullWidth
                                    onKeyPress={(e: any) => { if (e.key === "Enter") { e.preventDefault(); this.searchAddress() } }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton onClick={this.searchAddress.bind(this)}>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            }
                        </FormControl>
                    </Toolbar>
                </AppBar>
                <CssBaseline />
                <Switch>
                    <Route exact path="/" render={() => (
                        this.state.redirect ?
                            (<Redirect to={`/miner/${this.state.address}`} />) :
                            (<PoolDetails locale={this.locale} font={this.font} />)
                    )}/>
                    <Route exact path="/miner/:hash" component={this.minerDetails}/>
                </Switch>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    message={<span id="message-id">{ this.locale["error-no-address"] }</span>}
                    action={
                        <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    }
                />
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
                </Paper>
            </div >
        )
    }
}

export default App
