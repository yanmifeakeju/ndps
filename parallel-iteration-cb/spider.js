import fs from 'fs';
import { download } from './download.js';
import { spiderLinks } from './spiderLinks.js';
import { urlToFilename } from './utils.js';

const spidering = new Set();
export const spider = (url, nesting, cb) => {
  if (spidering.has(url)) return process.nextTick(cb);

  spidering.add(url);

  const filename = `spider/${urlToFilename(url)}`;

  fs.readFile(filename, (err) => {
    if (err && err.code !== 'ENOENT') return cb(err);

    download(url, filename, (err, requestContents) => {
      if (err) cb(err);

      spiderLinks(url, requestContents, nesting, cb);
    });
  });
};
