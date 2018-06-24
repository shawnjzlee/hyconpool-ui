import * as React from 'react';
import { Header } from "./components/header";
import { MinerDetails } from './components/minerDetails';
import { PoolDetails } from './components/poolDetails';
import { CssBaseline } from '@material-ui/core';
import { Link, Route, Switch, RouteComponentProps } from "react-router-dom";
import { RouteConfig } from "react-router-config";
import { Footer } from './components/footer';
import { IRest } from './rest';
import { NotFound } from "./components/notFound"
// import { RestClient } from './restClient';

export const routes: RouteConfig[] = [
    { exact: true, path: "/" },
    { exact: true, path: "/minerView/:address"}
]
class App extends React.Component<{ rest: IRest }, any> {
    public rest: IRest
    public poolDetails: ({ match }: RouteComponentProps<{}>) => JSX.Element
    public minerDetails: ({ match }: RouteComponentProps<{ address: string }>) => JSX.Element
    public notFound: boolean

    constructor(props: any) {
        super(props)
        this.state = {
            name: "hyconpool.",
        }
        this.rest = props.rest
        this.poolDetails = ({ match }: RouteComponentProps<{}>) => ( <PoolDetails rest={this.rest} /> )
        this.minerDetails = ({ match }: RouteComponentProps<{ address: string }>) => ( <MinerDetails address={match.params.address} rest={this.rest} notFound={this.notFound} />)
    }

    public render() {
        return (
            <div>
                <Header />
                <CssBaseline />                     
                <Switch>
                    {/* <Route exact path='/' component={() => { return <Home name={this.state.name} /> }} /> */}
                    <Route exact path="/" component={this.poolDetails} />
                    <Route exact path="/miner/:address" component={this.minerDetails} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default App;
