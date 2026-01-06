const http = require('http');
const os = require('os');
PORT = 8080;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`YOOOO what up, hello from Rodrig's app :))\nRunning on pod: ${os.hostname()}\n`);
});

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
