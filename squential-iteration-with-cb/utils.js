import * as cheerio from 'cheerio';
import path from 'path';
import slug from 'slug';
import { URL } from 'url';

export function urlToFilename(url) {
  const parsedUrl = new URL(url);
  const urlPath = parsedUrl.pathname
    .split('/')
    .filter(function (component) {
      return component !== '';
    })
    .map(function (component) {
      return slug(component, { remove: null });
    })
    .join('/');

  let filename = path.join(parsedUrl.hostname, urlPath);
  if (!path.extname(filename).match(/htm/)) {
    filename += '.html';
  }

  return filename;
}

function getLinkUrl(currentUrl, element) {
  const parsedLink = new URL(element.attribs.href || '', currentUrl);
  const currentParsedUrl = new URL(currentUrl);
  if (
    parsedLink.hostname !== currentParsedUrl.hostname ||
    !parsedLink.pathname
  ) {
    return null;
  }
  return parsedLink.toString();
}

export function getPageLinks(currentUrl, body) {
  return Array.from(cheerio.load(body)('a'))
    .map(function (element) {
      return getLinkUrl(currentUrl, element);
    })
    .filter(Boolean);
}
