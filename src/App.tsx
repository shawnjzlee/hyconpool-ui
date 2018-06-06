import * as React from 'react';
import { Header } from "./components/header";
import { MinerDetails } from './components/minerDetails';
import { PoolDetails } from './components/poolDetails';

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            validAddress: 1,
        }
    }

    public searchAddress() {
        let result = false
        // let result = sqlquery
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
                component = <MinerDetails />
                break;
            case 1:
                component = <PoolDetails />
                break;
        }

        return (
            <div className="App">
                <Header 
                    validAddress={this.state.validAddress}
                    homePage={this.homePage.bind(this)}
                    searchAddress={this.searchAddress.bind(this)}
                />
                {component}
            </div>
        );
    }
}

export default App;
