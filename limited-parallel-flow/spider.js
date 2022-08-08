import { spiderTask } from './spiderTask.js';

const spidering = new Set();
export const spider = (url, nesting, queue) => {
  if (spidering.has(url)) {
    return;
  }
  spidering.add(url);

  queue.pushTask((done) => {
    spiderTask(url, nesting, queue, done);
  });
};
