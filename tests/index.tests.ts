import { FetchContext, Middleware } from "swork";
import { FetchData, IFetchLogger, logger } from "./../src/index";
import { getFetchEvent, mockInit } from "./mock-helper";

declare var global: any;

describe("logger tests", () => {
    let instance: Middleware;
    let context: FetchContext;

    let noopNext: () => Promise<void>;
    let mockLogger: IFetchLogger;
    let mockLog: jest.Mock<(data: FetchData) => void>;

    beforeEach(() => {
        mockInit();

        mockLog = jest.fn();
        noopNext = jest.fn();

        mockLogger = {
            log:  mockLog as unknown as (data: FetchData) => void,
        } as IFetchLogger;

        instance = logger(mockLogger);
        context = new FetchContext(getFetchEvent("http://www.google.com"));
    });

    test("logger no response", async (done) => {
        performance.now = jest.fn(() => 0);
        await instance(context, noopNext);      

        expect(noopNext).toBeCalledTimes(1);
        expect(performance.now).toBeCalledTimes(1);
        expect(mockLogger.log).toBeCalledTimes(1);
        
        done();
    });

    test("logger with response", async (done) => {
        performance.now = jest.fn(() => 0);
        context.response = new Response("hello!");
        await instance(context, noopNext);
        
        expect(noopNext).toBeCalledTimes(1);
        expect(performance.now).toBeCalledTimes(2);
        expect(mockLogger.log).toBeCalledTimes(1);
        
        done();
    });

    test("default logger", async (done) => {
        console.log = jest.fn();

        instance = logger();

        await instance(context, noopNext);
        
        expect(noopNext).toBeCalledTimes(1);
        expect(console.log).toBeCalledTimes(1);

        done();
    });
});
