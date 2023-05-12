import {describe, expect, test, vi} from "vitest";
import {
  AbstractLogger, BufferLogger,
  ConsoleLogger,
  ConsoleMainLogger,
  DEFAULT_LOG_LEVEL,
  ILogger,
  LogLevel,
  LogService
} from "../src";
import {URI} from "../src/base";
import {LoggerService} from '../src/log/node/loggerService'
import * as path from "path";


class FakeLogger1 extends AbstractLogger implements ILogger {

  constructor(logLevel: LogLevel = DEFAULT_LOG_LEVEL) {
    super();
    this.setLevel(logLevel);
  }

  trace(message: string, ...args: any[]): void {
    if (this.checkLogLevel(LogLevel.Trace)) {
      expect({message, ...args}).toStrictEqual({message, ...args})
      console.log(message, ...args);

    }
  }

  debug(message: string, ...args: any[]): void {
    if (this.checkLogLevel(LogLevel.Debug)) {
      expect({message, ...args}).toStrictEqual({message, ...args})
      console.log(message, ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.checkLogLevel(LogLevel.Info)) {
      expect({message, ...args}).toStrictEqual({message, ...args})
      console.log(message, ...args);
    }
  }

  warn(message: string | Error, ...args: any[]): void {
    if (this.checkLogLevel(LogLevel.Warning)) {
      expect({message, ...args}).toStrictEqual({message, ...args})
      console.log(message, ...args);
    }
  }

  error(message: string, ...args: any[]): void {
    if (this.checkLogLevel(LogLevel.Error)) {
      expect({message, ...args}).toStrictEqual({message, ...args})
      console.log(message, ...args);
    }
  }

  override dispose(): void {
    // noop
  }

  flush(): void {
    // noop
  }
}

class FakeLogger2 extends AbstractLogger implements ILogger {

  constructor(logLevel: LogLevel = DEFAULT_LOG_LEVEL) {
    super();
    this.setLevel(logLevel);
  }

  trace(message: string, ...args: any[]): void {
    if (this.checkLogLevel(LogLevel.Trace)) {
      expect({message, ...args}).toStrictEqual({message, ...args})
      console.log(message, ...args);

    }
  }

  debug(message: string, ...args: any[]): void {
    if (this.checkLogLevel(LogLevel.Debug)) {
      expect({message, ...args}).toStrictEqual({message, ...args})
      console.log(message, ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.checkLogLevel(LogLevel.Info)) {
      expect({message, ...args}).toStrictEqual({message, ...args})
      console.log(message, ...args);
    }
  }

  warn(message: string | Error, ...args: any[]): void {
    if (this.checkLogLevel(LogLevel.Warning)) {
      expect({message, ...args}).toStrictEqual({message, ...args})
      console.log(message, ...args);
    }
  }

  error(message: string, ...args: any[]): void {
    if (this.checkLogLevel(LogLevel.Error)) {
      expect({message, ...args}).toStrictEqual({message, ...args})
      console.log(message, ...args);
    }
  }

  override dispose(): void {
    // noop
  }

  flush(): void {
    // noop
  }
}

describe("logService", () => {

  test("create multiplex logService ", function () {
    const logger = new LogService(new FakeLogger1(LogLevel.Debug), [new FakeLogger2()])
    expect(logger).toBeTruthy()
    logger.info("aaa")
    logger.debug("debug")
    logger.trace("trace")
    logger.warn("warn")
    logger.error("error")
  })

  test("create console logService ", function () {
    vi.spyOn(console, 'log').mockImplementation((message: string, ...args: any[]) => {
      return expect({message, ...args}).toStrictEqual({message, ...args})
    })
    const logger = new LogService(new ConsoleLogger(LogLevel.Debug))
    expect(logger).toBeTruthy()
    logger.info("aaa")
    logger.debug("debug")
    logger.trace("trace")
    logger.warn("warn")
    logger.error("error")
  })

  test("create console main logService ", function () {
    vi.spyOn(console, 'log').mockImplementation((message: string, ...args: any[]) => {
      return expect({message, ...args}).toStrictEqual({message, ...args})
    })
    const logger = new LogService(new ConsoleMainLogger(LogLevel.Debug))
    expect(logger).toBeTruthy()
    logger.info("aaa")
    logger.debug("debug")
    logger.trace("trace")
    logger.warn("warn")
    logger.error("error")
  })

  test("create spd logService ", async function () {
    const uri = URI.file(path.join(__dirname, './.test_data/log'))
    const loggerService = new LoggerService(DEFAULT_LOG_LEVEL, uri)
    const bufferLogger = new BufferLogger(loggerService.getLogLevel());
    bufferLogger.logger = loggerService.createLogger('main', {name: 'mainLog'});
    const logger = new LogService(bufferLogger)
    expect(logger).toBeTruthy()
    logger.info("aaa")
    logger.debug("debug")
    logger.trace("trace")
    logger.warn("warn")
    logger.error("error")
  })
})
