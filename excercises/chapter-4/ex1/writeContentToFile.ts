import { writeFile } from 'fs';

export const writeContentsToFile = (
  destination: string,
  contents: string,
  callback: Function
) => {
  writeFile(destination, contents, (err) => {
    if (err) return callback(err);

    return callback(null, `Contents written to ${destination}`);
  });
};
