import { FetchData } from "./fetch-data";
import { IFetchLogger } from "./index";

export class FetchLogger implements IFetchLogger {
    public log(data: FetchData): void {
        if (data.hasResponse) {
            console.log(`%c${data.method} ${data.url} ${data.status} ${Math.round(data.executionTime)}ms`, this.style(data));
        } else {
            console.log(`%c${data.method} ${data.url} did not provide a response.`, this.style(data));
        }
    }

    private style(data: FetchData): string {
        let color: string;
        if (data.ok) {
            color = "1CE337";
        } else if (data.status === 0) {
            color = "FFA200";
        } else {
            color = "FF2200";
        }
        return `border-left:#${color} solid 4px;padding-left:8px;`;
    }
}
