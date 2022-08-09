import { readFileContent } from './readFiles';
import { writeContentsToFile } from './writeContentToFile';

export const concatFiles = (
  filePaths: string[],
  destination: string,
  callback: Function
) => {
  if (filePaths.length < 2) return callback('Paths must be more than two.');

  const length = filePaths.length;

  let contents = '';

  function iterate(index: number) {
    if (index === length) {
      return writeContentsToFile(destination, contents, callback);
    }

    readFileContent(filePaths[index], (err: Error, content: string) => {
      if (err) return callback(err);

      contents += `\n${content}`;
      iterate(index + 1);
    });
  }

  iterate(0);
};
