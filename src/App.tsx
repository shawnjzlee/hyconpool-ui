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
import { Redirect, RouteComponentProps } from "react-router"
import { RouteConfig } from "react-router-config"
import { Link, Route, Switch } from "react-router-dom"
import { MinerDetails } from "./components/minerDetails"
import { PoolDetails } from "./components/poolDetails"
import { getLocale, IText } from "./locales/locales"

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

    public locale: IText

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
            <PoolDetails locale={this.locale} />
        )
        this.minerDetails = ({ match }: RouteComponentProps<{ hash: string }>) => (
            <MinerDetails hash={match.params.hash} locale={this.locale} />
        )

        this.locale = getLocale(navigator.language)
    }

    public componentDidMount() {
        fetch("http://localhost:3004/users")
            .then((res) => res.json())
            .then((users) => this.setState((users)))
    }

    public searchAddress(event: any) {
        const url = "http://localhost:3004/users/" + this.state.address
        if (this.state.address === "") {
            this.setState({ validAddress: 0 })
            return
        } else if (!/^[a-zA-Z0-9]+$/.test(this.state.address)) {
            event.preventDefault()
            this.setState({ validAddress: 0, open: true })
            return
        }

        fetch(url).then((res: any) => {
            if (res.status !== 404) {
                this.setState({ validAddress: 2, redirect: true })
            } else {
                event.preventDefault()
                this.setState({ validAddress: 0, open: true })
            }
        })
    }

    public handleChange = (prop: any) => (event: any) => {
        this.setState({ [prop]: event.target.value })
    }

    public handleClose = (event: any) => {
        this.setState({ open: false })
    }

    public homePage() {
        this.setState({ validAddress: 1 })
    }

    public languageChange = (event: any) => {
        this.locale = getLocale(event.target.value)
        this.setState({ [event.target.name]: event.target.value })
        console.log(this.locale)
        console.log(this.state.language)
    }
    public render() {
        if (this.state.redirect) {
            return <Redirect to={`/miner/${this.state.address}`} />
        }
        return (
            <div>
                <AppBar position="sticky" color="default" style={{ flexGrow: 1, justifyContent: "space-between" }}>
                    <Toolbar style={{ display: "flex" }}>
                        <Link to="/" style={{ flex: 1, textAlign: "left", fontFamily: "Open Sans", textDecoration: "none" }}>
                            <Typography
                                variant="title"
                                color="primary"
                                style={{ flexBasis: 165, textAlign: "left", fontFamily: "Open Sans", cursor: "pointer" }}
                            >
                                minehycon.com
                            </Typography>
                        </Link>
                        <FormControl style={{ flexBasis: "50%" }}>
                            {this.state.validAddress ?
                                <Input
                                    id="address"
                                    type="text"
                                    placeholder="Address"
                                    value={this.state.address}
                                    onChange={this.handleChange("address")}
                                    fullWidth
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
                                    placeholder="Address"
                                    value={this.state.address}
                                    onChange={this.handleChange("address")}
                                    fullWidth
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
                <div>
                    <Switch>
                        <Route exact path="/" component={this.home}/>
                        <Route exact path="/miner/:hash" component={this.minerDetails}/>
                    </Switch>
                </div>
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
                    }/>
                <div>
                    <Paper style={{ position: "fixed", bottom: 0, height: "5vh", width: "100%" }}>
                        <Grid container style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography style={{ textAlign: "center", marginTop: "12px", marginRight: "12px" }}>
                                © minehycon 2018 | hycon-core release version: 0.0.6-eccentric emu
                        </Typography>
                            <FormControl style={{ marginTop: "1.5vh" }}>
                                <Select
                                    value={this.state.language}
                                    onChange={this.languageChange.bind(event)}
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
                    </Paper>
                </div >
            </div >
        )
    }
}

export default App
