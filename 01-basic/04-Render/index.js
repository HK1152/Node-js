const fs = require("fs");
const http = require("http");


const server = http.createServer((req, res) => {
    if(req.url === "/" && req.method === "GET"){
        let home = fs.readFileSync('./views/home.html','utf-8');
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(home);
    }
    else if(req.url === "/about" && req.method === "GET"){
        let about = fs.readFileSync('./views/about.html','utf-8');
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(about);
    }
    else{
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("Page not found");
    }
})

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
})