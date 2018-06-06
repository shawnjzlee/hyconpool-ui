import { IRest } from "./rest";

class RestClient implements IRest {
    public async getAddress(address: string): Promise<boolean> {
        const headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        return await fetch(`/address`, {
            body: JSON.stringify({ address }),
            headers,
            method: "GET",
        }).then((response) => response.json())
        .catch();
    }

    public async getPayout(address: string): Promise<any[] | boolean> {
        const headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        return await fetch(`/address`, {
            body: JSON.stringify({ address }),
            headers,
            method: "GET",
        }).then((response) => response.json())
        .catch();
    }
}
