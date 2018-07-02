import { CssBaseline, Snackbar } from "@material-ui/core"
import AppBar from "@material-ui/core/AppBar"
import FormControl from "@material-ui/core/FormControl"
import IconButton from "@material-ui/core/IconButton"
import Input from "@material-ui/core/Input"
import InputAdornment from "@material-ui/core/InputAdornment"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import CloseIcon from "@material-ui/icons/Close"
import SearchIcon from "@material-ui/icons/Search"
import * as React from "react"
import { Redirect, RouteComponentProps } from "react-router"
import { RouteConfig } from "react-router-config"
import { Link, Route, Switch } from "react-router-dom"
import { Footer } from "./components/footer"
// import { Header } from "./components/header";
import { MinerDetails } from "./components/minerDetails"
import { PoolDetails } from "./components/poolDetails"

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

    constructor(props: any) {
        super(props)
        this.state = {
            users: [],
            address: undefined,
            open: false,
            validAddress: 1,
            redirect: false,
        }
        this.home = ({ match }: RouteComponentProps<{}>) => (
            <PoolDetails />
        )
        this.minerDetails = ({ match }: RouteComponentProps<{ hash: string }>) => (
            <MinerDetails hash={match.params.hash} />
        )

    }

    public componentDidMount() {
        fetch("http://localhost:3004/users")
            .then((res) => res.json())
            .then((users) => this.setState((users)))
    }

    public searchAddress(event: any) {
        const url = "http://localhost:3004/users/" + this.state.address
        if (this.state.address === undefined) {
            this.setState({ validAddress: 0 })
        } else if (!/^[a-zA-Z0-9]+$/.test(this.state.address)) {
            event.preventDefault()
            this.setState({ validAddress: 0, open: true })
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
        console.log(prop)
        console.log(event.target.value)
        this.setState({ [prop]: event.target.value })
    }

    public handleClose = (event: any) => {
        this.setState({ open: false })
    }

    public homePage() {
        this.setState({ validAddress: 1 })
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
                    message={<span id="message-id">Could not find that address</span>}
                    action={
                        <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    }/>
                <Footer />
            </div >
        )
    }
}

export default App
