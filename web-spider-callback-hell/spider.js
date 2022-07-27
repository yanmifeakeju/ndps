import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import supgeragent from 'superagent';
import { urlToFilename } from './utils.js';

export const spider = (url, cb) => {
  const filename = `spider/${urlToFilename(url)}`;

  fs.access(filename, (err) => {
    if (err && err.code === 'ENOENT') {
      console.log(`Downloading... ${filename}`);
      supgeragent.get(url).end((err, res) => {
        if (err) return cb(err);

        console.log(path.dirname(filename));
        mkdirp(path.dirname(filename))
          .then((made) => {
            console.log(made);
            fs.writeFile(filename, res.text, (err) => {
              if (err) cb(err);
              cb(null, filename, true);
            });
          })
          .catch((err) => cb);
      });
    } else {
      cb(null, filename, false);
    }
  });
};
