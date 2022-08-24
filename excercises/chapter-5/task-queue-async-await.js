/**
 *  Migrate the TaskQueue class internals from promises to async/await where possible.
 * Hint: you won't be able to use async/await everywhere.
 */

export class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  runTask(task) {
    return new Promise((resolve) => {
      this.queue.push(async () => {
        const t = await task();
        resolve(t);
      });
      process.nextTick(this.next.bind(this));
    });
  }

  async next() {
    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();
      this.running++;

      try {
        await task();
      } catch (error) {
        console.log(error);
      }

      this.running--;
      this.next();
    }
  }
}
