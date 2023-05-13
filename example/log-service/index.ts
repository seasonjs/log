/*---------------------------------------------------------------------------------------------
 *  Copyright (c) seasonjs. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import path from "node:path"
import {LogService, ConsoleLogger, DEFAULT_LOG_LEVEL, URI, BufferLogger} from '@seasonjs/log'
import {LoggerService} from '@seasonjs/log/node'

const uri = URI.file(path.join(__dirname, './.test_data/log'))
const loggerService = new LoggerService(DEFAULT_LOG_LEVEL, uri)
const bufferLogger = new BufferLogger(loggerService.getLogLevel());
bufferLogger.logger=loggerService.createLogger('example')
const logger = new LogService(new ConsoleLogger(loggerService.getLogLevel()), [bufferLogger])
logger.info("this is an info")
