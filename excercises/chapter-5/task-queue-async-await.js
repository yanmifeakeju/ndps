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
        try {
          const t = await task();
          resolve(t);
        } catch (error) {
          console.log(error);
        }
      });
      process.nextTick(this.next.bind(this));
    });
  }

  async next() {
    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();
      this.running++;
      await task();
      this.running--;
    }
  }
}
