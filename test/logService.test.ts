import {describe, expect, test} from "vitest";
import {BufferLogger, ConsoleMainLogger, LogService} from "../src";


describe("logService", () => {
  test("create multiplex logService ", function () {
    const bufferLogger = new BufferLogger();
    const logger = new LogService(bufferLogger, [new ConsoleMainLogger()])
    expect(logger).toBeTruthy()
    logger.info("aaa")
  })

  test("create buffer logService", function () {
    const bufferLogger = new BufferLogger();
    const logger = new LogService(bufferLogger)
    expect(logger).toBeTruthy()
    logger.info("aaa")
  })
})
