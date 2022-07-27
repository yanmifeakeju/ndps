import superagent from 'superagent';
import { saveFile } from './savefile.js';

export const download = (url, filename, cb) => {
  superagent
    .get(url)
    .then((res) => {
      saveFile(filename, res.text, cb);
    })
    .catch(cb);
};
