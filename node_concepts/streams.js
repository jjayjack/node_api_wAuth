// Need to read large text file from file system and send data to the client

const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // Solution 1: read file into variable & send to client
  /*
  fs.readFile('test-file.txt', (err, data) => {
    if (err) console.log(err);
    res.end(data);
  });
  */
  // Solution 2: streams: create a readable stream
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server on..');
});
