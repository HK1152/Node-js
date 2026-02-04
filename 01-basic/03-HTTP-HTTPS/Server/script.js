const http = require("http");

const server = http.createServer((req, res) => {
    res.end("Hello World");
});

server.listen(5000, () => {
    console.log("Server started on localhost:5000");
});