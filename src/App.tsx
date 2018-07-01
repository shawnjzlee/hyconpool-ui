import * as React from 'react';
// import { Header } from "./components/header";
import { MinerDetails } from './components/minerDetails';
import { PoolDetails } from './components/poolDetails';
import { CssBaseline, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Footer } from './components/footer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            users: [],
            address: undefined,
            open: false,
            validAddress: 1,
        }
    }

    componentDidMount() {
        fetch('http://localhost:3004/users')
            .then(res => res.json())
            .then(users => this.setState((users)))
    }

    public searchAddress(event: any) {
        if (this.state.address === undefined) {
            this.setState({ validAddress: 0 })
        }
        else if (!/^[a-zA-Z0-9]+$/.test(this.state.address)) {
            event.preventDefault()
            this.setState({ validAddress: 0, open: true })
        } else {
            this.setState({ validAddress: 2 })
        }
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
        let component: any;
        switch (this.state.validAddress) {
            case 0:
                // should just change search bar to red
                // component = <MinerDetails />
                component = <PoolDetails />
                break;
            case 1:
                component = <PoolDetails />
                break;
            case 2:
                component = <MinerDetails />
                break;
        }

        return (
            <div>
                <AppBar position="sticky" color="default" style={{ flexGrow: 1 }}>
                    <Toolbar style={{ display: "flex" }}>
                        <Typography variant="title" color="inherit" style={{ flex: 1, textAlign: "left", fontFamily: "Open Sans", cursor: "pointer" }} onClick={this.props.homePage}>
                            minehycon.com
                        </Typography>
                        <FormControl style={{ flexBasis: 200 }}>
                            {this.state.validAddress ? 
                                <Input
                                    id="address"
                                    type="text"
                                    placeholder="Address"
                                    value={this.state.address}
                                    onChange={this.handleChange('address')}
                                /> :
                                <Input
                                    error
                                    id="address"
                                    type="text"
                                    placeholder="Address"
                                    value={this.state.address}
                                    onChange={this.handleChange('address')}
                                />
                            }
                        </FormControl>
                        <IconButton onClick={this.searchAddress.bind(this)}>
                            <SearchIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <CssBaseline />
                {component}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={2000}
                    onClose={this.handleClose}
                    message={<span id="message-id">Could not find that address</span>}
                    action={
                        <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    }/>
                <Footer />
            </div>
        );
    }
}

export default App;
