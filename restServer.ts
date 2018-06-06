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

            const strsql = "SELECT 1 FROM shares WHERE address = ?"
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

    public async getPayout(address: string): Promise<any[] | boolean> {
        try {
            const strsql = "SELECT address, hashes, txid FROM shares WHERE address = ?"
            const insert = [address]
            const sql = mysql.format(strsql, insert)

            return new Promise<any[]>((resolve, reject) => {
                this.db.query(sql, (err, results, fields) => {
                    if (err) {
                        reject()
                    } else {
                        resolve(results)
                    }
                })
            })
        } catch (e) {
            console.log("Faled to get payout list")
            return false
        }
    }
}
