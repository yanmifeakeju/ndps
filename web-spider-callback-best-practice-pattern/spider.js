import fs from 'fs';
import { download } from './download.js';
import { saveFile } from './savefile.js';
import { urlToFilename } from './utils.js';

export const spider = (url, cb) => {
  const filename = `spider/${urlToFilename(url)}`;

  fs.access(filename, (err) => {
    if (!err || err.code !== 'ENOENT') return cb(null, filename, false);
    download(url, filename, saveFile, cb);
  });
};
