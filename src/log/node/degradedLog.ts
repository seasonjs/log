/*---------------------------------------------------------------------------------------------
 *  Copyright (c) seasonjs. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {LogLevel, LogLevelToString} from "../log";
import {Transform, TransformOptions} from 'readable-stream'
import {createStream} from 'rotating-file-stream';
import {ByteSize} from "../../files";

interface IDegradedLogOptions extends TransformOptions {
  logName?: string
}

export class DegradedLog extends Transform {
  private _formatterStr: string;
  private readonly _logName: string;
  private _logLevel: LogLevel;

  constructor(options?: IDegradedLogOptions) {
    super(options);
    this._formatterStr = "[%l] %v"
    this._logName = options?.logName ?? ""
  }

  public log(level: LogLevel, message: string): void {
    if (level >= this._logLevel) {
      const logLevel = LogLevelToString(level)
      this.write(this._formatter(logLevel, message))
      this.write('/n')
    }
  }


  //the str may like'[%n] %Y-%m-%d %H:%M:%S.%e [%l] %v'
  public setPattern(str: string) {
    this._formatterStr = str
  }

  // parse this._formatterStr then return a formatted log string
  private _formatter(level: string, message: string): string {
    const now = new Date();
    return this._formatterStr
      .replace('%n', now.getFullYear().toString())
      .replace('%Y', now.getFullYear().toString())
      .replace('%m', (now.getMonth() + 1).toString().padStart(2, '0'))
      .replace('%d', now.getDate().toString().padStart(2, '0'))
      .replace('%H', now.getHours().toString().padStart(2, '0'))
      .replace('%M', now.getMinutes().toString().padStart(2, '0'))
      .replace('%S', now.getSeconds().toString().padStart(2, '0'))
      .replace('%e', now.getMilliseconds().toString().padStart(3, '0'))
      .replace('%l', level)
      .replace('%v', message);
  }

  public setLevel(level: LogLevel) {
    this._logLevel = level
  }

  public flush() {

  }

  public drop() {
    this.destroy()
  }
}

export function createDegradedLogLogger(name: string, logfilePath: string, filesize: number, filecount: number, donotUseFormatters: boolean) {
  const stream = createStream(logfilePath, {
    maxFiles: filecount,
    size: ByteSize.formatSize(filesize)
  })
  const degradedLog = new DegradedLog({logName: name});
  degradedLog.pipe(stream);
  if (donotUseFormatters) {
    degradedLog.setPattern('%Y-%m-%d %H:%M:%S.%e [%l] %v')
  }
  return degradedLog
}
