/**
 * File Concatenation
 * Write the implementation of concatFiles(), a callback-style function
 * that takes two or more paths to text files in the filesytem
 * and a destination file.
 *
 * This function must copy the contents of every source file into the destination
 * file, respecting the order of the files, as provided by the arguments list.
 *
 * For instance, given two files, if the first file contains foo and the second
 * file contains bar, the function should write foobar (and not barfoo) in the
 * destination file.
 */

import { concatFiles } from './concatFiles';

concatFiles(
  ['files/file1.txt', 'files/file2.txt', 'files/file3.txt'],
  'newfile',
  (err: Error, data: string) => {
    if (err) return console.error(err);

    console.log(data);
  }
);
