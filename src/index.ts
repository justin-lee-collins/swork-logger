import { FetchContext, Middleware, Swork } from "swork";
import { FetchData } from "./fetch-data";
import { FetchLogger } from "./fetch-logger";

export interface IFetchLogger {
    log(data: FetchData): void;
}

export { FetchData };

export const logger = (instance?: IFetchLogger): Middleware => {
    
    instance = instance || new FetchLogger();

    return async (context: FetchContext, next: () => Promise<void>) => {
        const fetchData = new FetchData(context.request);

        const start = performance.now();
        
        await next();

        if (context.response) {
            const response = await context.response;
            fetchData.setResponse(response, performance.now() - start);
        }

        instance!.log(fetchData);
    };
};
