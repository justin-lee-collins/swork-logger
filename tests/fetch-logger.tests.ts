import { FetchContext, Middleware } from "swork";
import { FetchData, IFetchLogger, logger } from "../src/index";
import { getFetchEvent, mockInit } from "./mock-helper";
import { FetchLogger } from "../src/fetch-logger";

declare var global: any;

describe("FetchLogger tests", () => {
    const noopNext = () => Promise.resolve();

    let instance: FetchLogger;
    let data: FetchData;
    let logMock: jest.Mock;

    beforeEach(() => {
        mockInit();

        instance = new FetchLogger();
        data = new FetchData(new Request("http://www.google.com"));
        logMock = jest.fn();
        console.log = logMock;
    });

    test("style", () => {
        // tslint:disable-next-line:no-string-literal
        const style = instance["style"] as (data: FetchData) => string;

        expect(style(data)).toBe("border-left:#FFA200 solid 4px;padding-left:8px;");

        data.setResponse(new Response("hello!", { status: 404 }), 20);

        expect(style(data)).toBe("border-left:#FF2200 solid 4px;padding-left:8px;");

        data.setResponse(new Response("hello!", { status: 200 }), 20);

        expect(style(data)).toBe("border-left:#1CE337 solid 4px;padding-left:8px;");
    });

    test("log", () => {
        instance.log(data);

        expect(logMock).toBeCalledWith("%cGET http://www.google.com/ did not provide a response.", "border-left:#FFA200 solid 4px;padding-left:8px;");

        logMock.mockClear();

        data.setResponse(new Response("hello!", { status: 203 }), 100);
        instance.log(data);

        expect(logMock).toBeCalledWith("%cGET http://www.google.com/ 203 100ms", "border-left:#1CE337 solid 4px;padding-left:8px;");
    });
});
