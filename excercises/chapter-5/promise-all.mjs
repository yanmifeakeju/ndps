/**
 * 5.1 Dissecting Promise.all(): Implement your own version of Promise.all()
 * leveraging promises, async/await, or a combination of the two.
 * The function must be functionally equivalent to its original counterpart.
 */

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
  return new Promise(async (resolve) => {
    await delay(seconds * 1000);
    console.log(seconds);
    resolve(seconds);
  });
}

async function rejectedPromise() {
  return Promise.reject(new Error('Rejected.'));
}

PromiseAll(
  promisedFuncs(4),
  promisedFuncs(2),
  promisedFuncs(1),

  promisedFuncs(3)
).then(console.log, console.error);
