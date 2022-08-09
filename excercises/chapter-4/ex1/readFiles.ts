import { readFile } from 'fs';

export const readFileContent = (file: string, callback: Function) => {
  readFile(file, 'utf-8', (error, data) => {
    if (error) return callback(error);

    return callback(null, data);
  });
};
