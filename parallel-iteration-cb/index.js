import { spider } from './spider.js';

spider(process.argv[2], 10, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Download complete');
});
