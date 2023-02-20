const fs = require('fs');
const crypto = require('crypto');

const startTime = Date.now();

process.env.UV_THREADPOOL_SIZE = 1; // run within node terminal as set UV_THREADPOOL_SIZE=1& node event-loop.js

setTimeout(() => console.log('timer 1 finished'), 3);

setImmediate(() => console.log('immediate timer 1 finished'));

fs.readFile('test-file.txt', () => {
  console.log('I/O finished');
  console.log('--------------------------');

  setTimeout(() => console.log('timer 2 finished'), 0);
  setTimeout(() => console.log('timer 3 finished'), 3000);

  setImmediate(() => console.log('immediate timer 2 finished'));

  process.nextTick(() => console.log('next tick timer 1 finished'));

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - startTime, 'password encrypted 1');
  });

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - startTime, 'password encrypted 2');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - startTime, 'password encrypted 3');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - startTime, 'password encrypted 4');
  });
});

console.log('__hello from the top__');
