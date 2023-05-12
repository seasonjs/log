import {isNumber} from "../base";

export class ByteSize {
  static readonly KB = 1024;
  static readonly MB = ByteSize.KB * ByteSize.KB;
  static readonly GB = ByteSize.MB * ByteSize.KB;
  static readonly TB = ByteSize.GB * ByteSize.KB;

  static formatSize(size: number): string {
    if (!isNumber(size)) {
      size = 0;
    }

    if (size < ByteSize.KB) {
      return `${size}B`;
    }

    if (size < ByteSize.MB) {
      return `${(size / ByteSize.KB).toFixed(2)}K`;

    }

    if (size < ByteSize.GB) {
      return `${ (size / ByteSize.MB).toFixed(2)}M`;
    }

    return `${(size /ByteSize.GB).toFixed(2)}G`;
  }
}
