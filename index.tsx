import FS from "fs"; // Only for types
import Stream from "stream"; // Only for types
import { URL } from "url";
import Path from "path";

class FileDescriptor {
  constructor(public name: string) {}
}

class Directory {
  private files = new Map<FileDescriptor, File>();
  constructor(parent?: Directory) {}
}

class File {
  constructor(private contents: string = "") {}
}

export class ReadStream extends Stream.Readable {}

export class WriteStream extends Stream.Writable {}

export class MemFS {
  private root = new Directory();

  public mkdir(
    pathLike: FS.PathLike,
    callback: (err: NodeJS.ErrnoException) => void
  ): void {
    const path = this.pathLikeToPath(pathLike);
    const { dir } = Path.parse(path);
    const parts = dir.split(Path.sep);

    let currentDirectory = this.root;
    while (parts.length) {
      const current = parts.shift();
      // if (currentDirectory...)
    }
  }

  /**
   * Convert a path like to path
   * if path is URL only `file:` protocol is supported
   * @param pathLike
   */
  private pathLikeToPath(pathLike: FS.PathLike): string {
    if (Buffer.isBuffer(pathLike)) {
      return pathLike.toString();
    }
    if (pathLike instanceof URL) {
      if (pathLike.protocol !== "file") {
        throw new Error(`${pathLike.toString()} protocol must be file:`);
      }
      return pathLike.pathname;
    }
    return pathLike;
  }
}
