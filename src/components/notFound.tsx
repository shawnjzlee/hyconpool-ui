import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import * as React from "react"
import { Link } from "react-router-dom"
import Button from "@material-ui/core/Button";

export class NotFound extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }
    public render() {
        return (
            <div style={{ textAlign: "center" }}>
                <Typography variant="display3">404: Page not found</Typography>
                <Typography variant="headline">Sorry, we couldn't find that address</Typography>
                <Typography variant="body2">Did you enter the right info in your config.json?</Typography>
                <Typography variant="body2">We hope to have you soon!</Typography>
                <Grid container direction={"row"} justify={"center"} alignItems={"center"}>
                    <Link to="/"><Button>BACK TO HOME</Button></Link>
                </Grid>
            </div>
        )
    }
}