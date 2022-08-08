import fs from 'fs';
import { download } from './download.js';
import { spiderLinks } from './spiderLinks.js';
import { urlToFilename } from './utils.js';

export const spiderTask = (url, nesting, queue, cb) => {
  const filename = `spider/${urlToFilename(url)}`;

  fs.readFile(filename, 'utf-8', (err, fileContents) => {
    if (err) {
      if (err.code !== 'ENOENT') return cb(err);

      return download(url, filename, (err, requestContent) => {
        if (err) return cb(err);

        spiderLinks(url, requestContent, nesting, queue);
        return cb();
      });
    }

    spiderLinks(url, fileContents, nesting, queue);
    return cb();
  });
};
