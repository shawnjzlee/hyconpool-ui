import AppBar from '@material-ui/core/AppBar';
import * as React from 'react';
import { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import Input from '@material-ui/core/Input';
// import FormControl from '@material-ui/core/FormControl';
// import SearchIcon from '@material-ui/icons/Search';

export class Header extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            address: "",
        }
    }

    public handleChange = (prop: any) => (event: any) => {
        console.log(prop)
        console.log(event.target.value)
        this.setState({ [prop]: event.target.value })
    }

    public render() {
        return (
            <div>
                <AppBar position="sticky" color="default" style={{ flexGrow: 1 }}>
                    <Toolbar style={{ display: "flex" }}>
                        <Typography variant="title" color="inherit" style={{ flex: 1, textAlign: "left", fontFamily: "Open Sans", cursor: "pointer" }} onClick={this.props.homePage}>
                            minehycon.com
                        </Typography>
                        {/* <FormControl style={{ flexBasis: 200 }}>
                            {this.props.validAddress ? 
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
                        <IconButton onClick={this.props.searchAddress}>
                            <SearchIcon />
                        </IconButton> */}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}