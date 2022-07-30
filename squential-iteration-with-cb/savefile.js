import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';

export const saveFile = (filename, contents, cb) => {
  mkdirp(path.dirname(filename))
    .then((made) => {
      fs.writeFile(filename, contents, () => {
        cb(null, contents);
      });
    })
    .catch(cb);
};
