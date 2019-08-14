# swork-logger

[![Greenkeeper badge](https://badges.greenkeeper.io/justin-lee-collins/swork-logger.svg)](https://greenkeeper.io/)

swork-logger is a swork middleware designed to log info for every fetch made through the service worker. It is built with TypeScript and async methods.

**INSTALLATION**

`npm install swork-logger`

`yarn add swork-logger`

**EXAMPLE**

```ts
import { Swork } from "swork";
import { logger } from "swork-logger";

const app = new Swork();

app.use(logger());

app.listen();
```

**NOTES**

It is suggested to include `logger` early in the request pipeline to be able to log all fetch requests. The default message will provide contextual information regarding each request including the http method, url, status and execution time. In addition, each log entry is color coded based upon the status.

If desired, the logging implementation can be overridden:

```ts
interface IFetchLogger { 
    log: (data: FetchData) => void;
}

class CustomLogger implements IFetchLogger { ... }

app.use(logger(new CustomLogger()));
```
