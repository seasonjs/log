<img src="https://github.com//seasonjs/tools/blob/main/public/icon.svg?raw=true" width="150" alt=''>

# @seasonjs/log

Js log library which copy from vscode


<p align="center">

<a href="https://www.npmjs.com/package/@seasonjs/log"><img src="https://img.shields.io/npm/v/@seasonjs/log.svg?sanitize=true" alt="Version"></a>
<a href="https://www.npmjs.com/package/@seasonjs/log"><img src="https://img.shields.io/npm/l/@seasonjs/log.svg?sanitize=true" alt="License"></a>

</p>

# quick start

### install

npm
```bash
npm i @seasonjs/log
```
yarn
```bash
yarn add @seasonjs/log
```
pnpm
```bash
pnpm add @seasonjs/log
```
### special notice

`import {LoggerService} from '@seasonjs/log/node'` this may need package `@vscode/spdlog`
you may need install it and add `external` key to your builder options

here is an example:
```typescript
import {defineConfig} from "vite";
// this is vite config,but it also work with rollup, as you know.
export default defineConfig(() => {
    return {
        build: {
            rollupOptions: {
                external: ['@vscode/spdlog']
            },
        },
    }
})
```


### example usage

just console log

```typescript
import {LogService, ConsoleLogger} from '@seasonjs/log'

const logger = new LogService(new ConsoleLogger(LogLevel.Debug))
logger.info("this is an info")
```

use with node and write to file

```typescript
import path from "node:path"
import {LogService, ConsoleLogger, DEFAULT_LOG_LEVEL, URI, BufferLogger} from '@seasonjs/log'
import {LoggerService} from '@seasonjs/log/node'

const uri = URI.file(path.join(__dirname, './.test_data/log'))
const loggerService = new LoggerService(DEFAULT_LOG_LEVEL, uri)
const bufferLogger = new BufferLogger(loggerService.getLogLevel());
// In this case mean you can set anyother logger to bufferLogger, which is implements with ILogger.
bufferLogger.logger = loggerService.createLogger('example')
const logger = new LogService(new ConsoleLogger(loggerService.getLogLevel()), [bufferLogger])
logger.info("this is an info")
```
