import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { EntityNameEnum } from '../../../common/enums/entity-name.enum';
import { ExceptionEnum } from '../../../common/enums/exception.enum';

import fs from 'fs';
import path, { PlatformPath } from 'path';

type DirectoryResult = {
  args: Record<string, boolean>;
  exists: () => boolean;
  create: () => boolean;
  remove: () => boolean | void;
};

type FileResult = {
  args: { path: PlatformPath };
  exists: () => boolean;
  write: (data: string) => boolean;
  read: () => string | null;
  remove: () => boolean | void;
};

@Injectable()
export class FileService {
  static directory(directory: string): DirectoryResult {
    //let fs = require('fs');
    return {
      args: {},
      exists(): boolean {
        return fs.existsSync(directory) && fs.statSync(directory).isDirectory();
      },
      create(): boolean {
        if (!this.exists()) {
          try {
            fs.mkdirSync(directory, { recursive: true });
            return true;
          } catch (e) {
            console.warn('ERR (directory.create) =>', e, directory);
          }
        }
        return false;
      },
      remove(): boolean | void {
        try {
          if (!fs.existsSync(directory)) {
            return true;
          }
          return fs.unlinkSync(directory);
        } catch (e) {
          console.warn('ERR (directory.remove) =>', e, directory);
          return false;
        }
      },
    };
  }
  static file(filename: string, directory = ''): FileResult {
    // We first analyse the directories and create them if necessary
    const filepath = path.join(directory, filename);
    if (directory) this.directory(directory).create();
    return {
      args: { path },
      exists(): boolean {
        return fs.existsSync(filepath) && fs.statSync(filepath).isFile();
      },
      write(data: string): boolean {
        try {
          fs.writeFileSync(filepath, data);
        } catch (e) {
          console.warn('ERR (file.write) =>', e, filepath);
          return false;
        }
      },
      read(): string {
        try {
          if (!fs.existsSync(filepath)) {
            return null;
          }
          return fs.readFileSync(filepath).toString();
        } catch (e) {
          console.warn('ERR (file.read) =>', e, filepath);
          return null;
        }
      },
      remove(): boolean | void {
        try {
          if (!fs.existsSync(filepath)) {
            return true;
          }
          return fs.unlinkSync(filepath);
        } catch (e) {
          console.warn('ERR (file.remove) =>', e, filepath);
          return false;
        }
      },
    };
  }

  static async saveFile(
    file: Express.Multer.File,
    entityPath = 'users',
  ): Promise<string> {
    const directory = entityPath;
    this.directory(path.join(process.env.CDN_PATH, directory)).create();
    return new Promise(async (resolve, reject) => {
      const ext = file.filename.split('.');
      const filepath =
        directory +
        uuidv4() +
        '.' +
        (ext.length > 0 ? ext[ext.length - 1] : 'jpg');
      fs.writeFile(
        path.join(process.env.CDN_PATH, filepath),
        file.buffer,
        (error) => {
          if (error) {
            console.log('Error =>', error);
            reject(ExceptionEnum.fileUploadFailed);
            return;
          }
          resolve(process.env.CDN_URL + filepath);
        },
      );
    });
  }

  static async saveImage(
    file: Express.Multer.File,
    entityName: EntityNameEnum = EntityNameEnum.other,
    existingOne = null,
  ): Promise<string> {
    const newImage = await this.saveFile(
      file,
      'img/' + entityName.toLowerCase() + '/',
    );
    if (newImage && existingOne) {
      //  We unlink existing image.
      try {
        FileService.file(
          existingOne.replace(process.env.CDN_URL, process.env.CDN_PATH),
        ).remove();
      } catch (e) {
        console.warn(e);
      }
    }
    return newImage;
  }
  static async removeImage(imgUrl: string): Promise<boolean> {
    if (imgUrl) {
      //  We unlink existing image.
      try {
        await FileService.file(
          imgUrl.replace(process.env.CDN_URL, process.env.CDN_PATH),
        ).remove();
      } catch (e) {
        console.warn(e);
      }
    }
    return false;
  }
}
