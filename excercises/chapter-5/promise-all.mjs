/**
 * 5.1 Dissecting Promise.all(): Implement your own version of Promise.all()
 * leveraging promises, async/await, or a combination of the two.
 * The function must be functionally equivalent to its original counterpart.
 */

import { resolve } from 'path';
import { promisify } from 'util';

const delay = promisify(setTimeout);

const PromiseAll = async (...operations) => {
  console.log(`Start seconds: ${new Date().getSeconds()}`);
  const results = [];

  for (let ops of operations) {
    results.push(await ops);
  }

  console.log(results);
  console.log(`Start seconds: ${new Date().getSeconds()}`);
};

async function promisedFuncs(seconds) {
  await delay(seconds * 1000);
  console.log(seconds);
  return seconds;
}

async function rejectedPromise(seconds) {
  await delay(seconds * 1000);
  throw new Error('Rejected');
}

PromiseAll(
  promisedFuncs(4),
  promisedFuncs(2),
  promisedFuncs(1),
  rejectedPromise(2),
  promisedFuncs(3)
).then(console.log, console.error);
