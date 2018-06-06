import * as bodyParser from "body-parser"
import * as express from "express"
import * as http from "http"
// import * as https from "https"
import * as mysql from "mysql"
import { dbConfig } from "./dbConfig"
import { RestServer } from "./restServer"

const db = mysql.createConnection(dbConfig)
const app = express()

function restRoutes(expressApp: express.Express, dbIn: mysql.Connection) {
    expressApp.use(bodyParser.json())
    let router: express.Router
    const rest = new RestServer(dbIn)
    router = express.Router()

    router.get("/address", async (req: express.Request, res: express.Response) => {
        res.json(await rest.getAddress(req.body.address))
    })

    router.get("/payout", async (req: express.Request, res: express.Response) => {
        res.json(await rest.getPayout(req.body.address))
    })

    expressApp.use(router)
}

const staticFiles = app.use(express.static("./build"))
http.createServer(staticFiles).listen(80, () => {
    console.log("Server listening on: http://localhost:8080")
    restRoutes(app, db)
})