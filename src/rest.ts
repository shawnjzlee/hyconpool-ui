export interface IRest {
    // make functions that appear on server + client
    getAddress(address: string): Promise<boolean>
    getPayout(address: string): Promise<any[] | boolean>
}
