# swork-logger

swork-logger is a [swork](https://www.npmjs.com/package/swork) middleware designed to log info for every fetch request made through the service worker. It is built with TypeScript and async methods.

**License**

MIT

**Installation**

`npm install swork-logger`

`yarn add swork-logger`

**Example**

```ts
import { Swork } from "swork";
import { logger } from "swork-logger";

const app = new Swork();

app.use(logger());

app.listen();
```

## Notes

It is suggested to include `logger` early in the request pipeline to be able to log all fetch requests. The default message will provide contextual information regarding each request including the http method, url, status and execution time. In addition, each log entry is color coded based upon the status.

If desired, the logging implementation can be overridden:

```ts

class CustomLogger implements IFetchLogger {
    public log(data: FetchData) { ... }
}

app.use(logger(new CustomLogger()));
```

## Contact

If you are using [swork](https://www.npmjs.com/package/swork) or any of its related middlewares, please let me know on [gitter](https://gitter.im/swork-chat/community). I am always looking for feedback or additional middleware ideas.