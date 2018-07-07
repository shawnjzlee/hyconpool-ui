import english from "./en"
import korean from "./kr"

export function getLocale(locale: string): IText {
    switch (locale.split("-")[0]) {
        case "en":
            return english
            break
        case "ko":
            return korean
            break
        default:
            return english
            break
    }
}
export interface IText {
    // header ---
    "address": string,

    // poolDetails ---
    "welcome-title": string,
    "welcome-sub": string,
    "pool-details-title": string,
    "hashrate": string,
    "active-miners": string,
    "blocks-hour": string,
    "last-mined": string,
    "instructions-title": string,
    "server": string,
    "stratum-port": string,
    "username": string,
    "your-wallet": string,
    "password": string,
    "your-password": string,

    // minerDetails ---
    "miner-title": string,
    "your-hashrate": string,
    "unpaid-balance": string,
    "total-shares": string,
    "table-shares": string,
    "table-block": string,
    "table-txid": string,
    "table-amount": string,

    // footer ---
    // misc ---
    "error-no-address": string,

}
