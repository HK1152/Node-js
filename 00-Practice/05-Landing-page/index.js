const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});
app.get('/about', (req, res) => {
    res.render("about");
});
app.get('/contact', (req, res) => {
    res.render("contact");
});
app.get('/service', (req, res) => {
    res.render("service");
});

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});