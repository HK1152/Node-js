const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
   if(req.url === "/" && req.method === "GET"){
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(fs.readFileSync("views/home.html", "utf-8"));
   }
   else if(req.url === "/about" && req.method === "GET"){
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(fs.readFileSync("views/about.html", "utf-8"));
   }
   else if(req.url === "/contact" && req.method === "GET"){
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(fs.readFileSync("views/contact.html", "utf-8"));
   }
   else{
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(fs.readFileSync("views/404.html", "utf-8"));
   }
});

server.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});
