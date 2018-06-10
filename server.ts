import * as bodyParser from "body-parser"
import * as express from "express"
import * as mysql from "mysql"
import { dbConfig } from "./dbConfig"
import { RestServer } from "./restServer"

export class SQLServer {
    private app: express.Application
    private db: mysql.Connection
    private rest: RestServer

    constructor(port: number = 8080, options: any) {
        this.app = express()
        this.db = mysql.createConnection(dbConfig)

        this.app.use(bodyParser.json())
        this.app.use(express.static("./build"))
        this.app.use(express.static("node_modules"))
        this.restRoutes()
        this.init(port)
        this.rest = new RestServer(this.db)
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(404)
            res.json({
                status: 404
            })
        })

    }

    public async init(port: number) {
        await new Promise((resolve, reject) => {
            this.db.connect((err) => {
                if (err) {
                    reject(err)
                } resolve()
            })
        })
        
        return new Promise((resolve, reject) => {
            this.app.listen(port, () => resolve())
        })
    }
    public restRoutes() {
        let router: express.Router
        router = express.Router()

        router.get("/address", async (req: express.Request, res: express.Response) => {
            res.json(await this.rest.getAddress(req.body.address))
        })

        router.get("/payout", async (req: express.Request, res: express.Response) => {
            res.json(await this.rest.getPayout(req.body.address))
        })
    }
}