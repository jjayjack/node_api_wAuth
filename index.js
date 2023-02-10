const fs = require('fs');
const http = require('http');
const url = require('url');

// const files = require('./files');

const server = http.createServer((req, res) => {
	res.end('Hello from the server');
});

server.listen(8080, '127.0.0.1', () => {
	console.log('Listening on port 8080');
});
