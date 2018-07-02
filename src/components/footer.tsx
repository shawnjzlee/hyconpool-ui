import { FormControl, Grid, MenuItem, Select } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import * as React from "react"
import { Component } from "react"
import { getLocale } from "../locales/locales"

export class Footer extends Component<any, any> {
    public language: any
    constructor(props: any) {
        super(props)
        this.state = {
            address: "",
            languageSelect: "en",
        }
        this.language = getLocale(navigator.language)
    }

    public languageChange = (event: any) => {
        this.language = getLocale(event.target.value)
        this.setState({ [event.target.name]: event.target.value })
        console.log(this.language)
        console.log(this.state.languageSelect)
    }

    public render() {
        return (
            <div>
                <Paper style={{ position: "fixed", bottom: 0, height: "5vh", width: "100%" }}>
                    <Grid container style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography style={{ textAlign: "center", marginTop: "12px", marginRight: "12px" }}>
                            © minehycon 2018 | hycon-core release version: 0.0.6-eccentric emu
                        </Typography>
                        <FormControl style={{ marginTop: "1.5vh" }}>
                            <Select
                                value={this.state.languageSelect}
                                onChange={this.languageChange.bind(event)}
                                inputProps={{
                                    id: "lang_select",
                                    name: "languageSelect",
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
        )
    }
}
