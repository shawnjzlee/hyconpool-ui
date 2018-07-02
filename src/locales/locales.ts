import english from "./en"
import korean from "./kr"

export function getLocale(code: string): IText {
    switch (code.split("-")[0]) {
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
}
