import superagent from 'superagent';

export const download = (url, filename, handler, cb) => {
  superagent
    .get(url)
    .then((res) => {
      console.log(`Downloaded:  ${url}`);
      handler(filename, res.text, cb);
    })
    .catch(cb);
};
