import superagent from 'superagent';
import { saveFile } from './savefile.js';

export const download = (url, filename, cb) => {
  superagent
    .get(url)
    .then((res) => {
      saveFile(filename, res.text, (err, contents) => {
        if (err) cb(err);
        cb(null, contents, true);
      });
    })
    .catch(cb);
};
