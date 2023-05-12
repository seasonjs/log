/*---------------------------------------------------------------------------------------------
 *  Copyright (c) seasonjs. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export {
  toDisposable,
  DisposableStore,
  Disposable,
  URI
} from './base'

export type {IDisposable, IReference} from './base'

export {
  isLogLevel,
  LogLevel,
  DEFAULT_LOG_LEVEL,
  log,
  ConsoleMainLogger,
  AbstractLogger,
  AbstractMessageLogger,
  ConsoleLogger,
  AdapterLogger,
  MultiplexLogger,
  AbstractLoggerService,
  NullLogger,
  NullLogService,
  parseLogLevel
} from './log/log'

export type {
  ILogger,
  ILogService,
  ILoggerOptions,
  ILoggerResource,
  DidChangeLoggersEvent,
  ILoggerService,
} from './log/log'

export {
  LogService
} from "./log/logService"

export {
  BufferLogger
} from "./log/bufferLog"
