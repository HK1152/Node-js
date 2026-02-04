const http = require('http'); //commonjs

const server = http.createServer((req, res) => {
    res.statusCode = 200;
  res.setHeader('aapp', 'bb/cc');
  res.end('Hello from the server!');
})
server.listen(5000, () => {
  console.log('Server is listening on port http://localhost:5000');
});