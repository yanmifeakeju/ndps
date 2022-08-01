import { spider } from './spider.js';
import { getPageLinks } from './utils.js';

export const spiderLinks = (currentUrl, body, nesting, cb) => {
  if (nesting === 0) {
    // Remember Zalgo from chapter 3?
    return process.nextTick(cb);
  }
  const links = getPageLinks(currentUrl, body); // (1)
  console.log(links);
  if (links.length === 0) {
    return process.nextTick(cb);
  }

  let completed = 0;
  let hasErrors = false;

  function done(err) {
    if (err) {
      hasErrors = true;
      return cb(err);
    }

    if (++completed === links.length && !hasErrors) {
      return cb();
    }
  }

  links.forEach((link) => spider(link, nesting - 1, done));
};
