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
  const readable = fs.createReadStream('test-file.txt');
  readable.on('data', (chunk) => {
    res.write(chunk);
  });
  readable.on('end', () => {
    res.end();
  });

  readable.on('error', (err) => {
    console.log(err);
    res.statusCode = 500;
    res.end('File not found');
  });
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server on..');
});
