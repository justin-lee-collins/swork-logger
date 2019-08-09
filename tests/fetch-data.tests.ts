import { FetchData } from "../src/index";
import { mockInit } from "./mock-helper";

declare var global: any;

describe("FetchData tests", () => {
    const noopNext = () => Promise.resolve();

    let instance: FetchData;
    let request: Request;

    beforeEach(() => {
        mockInit();

        request = new Request("http://www.google.com");

        instance = new FetchData(request);
    });

    test("clone", () => {
        const response = new Response("hello!");

        instance.setResponse(response, 0);

        const clone1 = instance.response;
        const clone2 = instance.response;

        expect(response).not.toBe(clone1);
        expect(response).not.toBe(clone2);
        expect(clone1).not.toBe(clone2);
    });

    test("hasResponse", () => {
        expect(instance.hasResponse).toBeFalsy();
        
        instance.setResponse(new Response("hello!"), 0);

        expect(instance.hasResponse).toBeTruthy();
    });

    test("throws error when no response", () => {
        expect(() => {
            const r = instance.response;
        }).toThrowError("No response to clone.");
    });

    test("request", () => {
        expect(instance.request).toBe(request);
    });

    test("executionTime", () => {
        instance.setResponse(new Response("hello!"), 99);

        expect(instance.executionTime).toBe(99);
    });

    test("ok", () => {
        expect(instance.ok).toBe(false);

        instance.setResponse(new Response("hello!", { status: 209 }), 99);

        expect(instance.ok).toBe(true);
    });

    test("status", () => {
        expect(instance.status).toBe(0);

        instance.setResponse(new Response("hello!", { status: 209 }), 99);

        expect(instance.status).toBe(209);
    });
});
