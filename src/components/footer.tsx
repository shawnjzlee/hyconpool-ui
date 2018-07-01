import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import * as React from "react"
import { Component } from "react"

export class Footer extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            address: "",
        }
    }

    public render() {
        return (
            <div>
                <Paper style={{ position: "fixed", bottom: 0, height: "5vh", width: "100%" }}>
                    <Typography style={{ textAlign: "center", marginTop: "12px" }}>
                        © minehycon 2018 | hycon-core release version: 0.0.6-eccentric emu
                    </Typography>
                </Paper>
            </div>
        )
    }
}
