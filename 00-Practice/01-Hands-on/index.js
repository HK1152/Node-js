const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { log } = require("console");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    fs.readdir(path.join(__dirname, "files"), (err, files) => {
        res.render("index", { files: files });
    });
});
app.post("/create", (req, res) => {
    const title = req.body.title.split(' ').join(''); // Basic sanitization
    const filename = `${title}.txt`;
    
    if (!title) {
        return res.status(400).send("Title is required");
    }

    fs.writeFile(path.join(__dirname, "files", filename), req.body.description, (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send("Error saving task");
        }
        res.redirect("/");
    });
});
app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
});

