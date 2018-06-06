import * as React from 'react';
import { Header } from "./components/header";
import { MinerDetails } from './components/minerDetails';
import { PoolDetails } from './components/poolDetails';
import { CssBaseline } from '@material-ui/core';
import { Footer } from './components/footer';
// import { RestClient } from './restClient';

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            validAddress: 1,
        }
    }

    public searchAddress() {
        let result: any
        result = fetch('/getAddress', {
            method: 'GET'
        }).then((response) => {
            return response;
        })
        console.log(result)

        console.log("searchAddress triggered")
        if (result) {
            this.setState({ validAddress: 2 })
        } else {
            this.setState({ validAddress: 0 })
        }
    }

    public homePage() {
        this.setState({ validAddress: 1 })
    }

    public render() {
        let component: any;
        switch (this.state.validAddress) {
            case 0:
                // should just change search bar to red
                component = <MinerDetails />
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
                <Header 
                    validAddress={this.state.validAddress}
                    homePage={this.homePage.bind(this)}
                    searchAddress={this.searchAddress.bind(this)}
                />
                <CssBaseline />
                {component}
                <Footer />
            </div>
        );
    }
}

export default App;
