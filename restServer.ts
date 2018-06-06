import * as mysql from "mysql"
import { IRest } from "./src/rest"

export class RestServer implements IRest {
    // database stuff
    public db: mysql.Connection
    constructor(database: mysql.Connection) {
        this.db = database
    }

    public async getAddress(address: string): Promise<boolean> {
        try {

            const strsql = "SELECT 1 FROM 'TABLE' WHERE address = ?"
            const insert = [address]
            const sql = mysql.format(strsql, insert)

            return new Promise<boolean>((resolve, reject) => {
                this.db.query(sql, (err, results, fields) => {
                    if (err) {
                        reject()
                    } else {
                        resolve(results.length === 1)
                    }
                })
            })
        } catch (e) {
            console.log(false)
            return false
        }
    }


}
