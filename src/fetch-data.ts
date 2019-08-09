/**
 * Data related to a specific request. Used for logging.
 */
export class FetchData {
    
    private _response!: Response;
    private _request: Request;
    private _executionTime!: number;

    constructor(request: Request) {
        this._request = request;
    }

    public get hasResponse(): boolean {
        return !!this._response;
    }
    
    /**
     * The resulting response. Returned value is a clone.
     *
     * @type {Response}
     * @memberof RequestData
     */
    public get response(): Response {
        if (!this._response) {
            throw new Error("No response to clone.");
        }

        return this._response.clone();
    }
    
    /**
     * Sets the response and time to execute
     *
     * @param {Response} value
     * @param {number} executionTime
     * @memberof FetchData
     */
    public setResponse(value: Response, executionTime: number) {
        this._response = value;
        this._executionTime = executionTime;
    }

    /**
     * The requested url
     *
     * @type {string}
     * @memberof RequestData
     */
    public get url(): string {
        return this._request.url;
    }
    
    /**
     * The HTTP method
     *
     * @type {string}
     * @memberof FetchData
     */
    public get method(): string {
        return this._request.method;
    }

    /**
     * The initiating request
     */
    public get request(): Request {
        return this._request;
    }
    
    /**
     * How long the request took in milliseconds
     */
    public get executionTime(): number {
        return this._executionTime;
    }
    
    /**
     * Indicates if the response is ok
     *
     * @type {boolean}
     * @memberof FetchData
     */
    public get ok(): boolean {
        return this._response ? this._response.ok : false;
    }
    
    /**
     * status of the response
     */
    public get status(): number {
        return this._response ? this._response.status : 0;
    }
}
