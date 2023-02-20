const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

// const myEmitter = new EventEmitter();
const myEmitter = new Sales();

// Observers
myEmitter.on('newSale', () => console.log('new sale!'));
myEmitter.on('newSale', () => console.log('customer name: john'));

myEmitter.on('newSale', (stock) => {
  console.log(`New order for ${stock} items`);
});

// Emitter
myEmitter.emit('newSale', 1);

//////////////////////////////

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Request received!');
  res.end('Request received');
});

server.on('request', (req, res) => {
  console.log('Another one! 🐱‍👤');
});

server.on('close', () => {
  console.log('Server closed ✌');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Waiting for requests..');
});
