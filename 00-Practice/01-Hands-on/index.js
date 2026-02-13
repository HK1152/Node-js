const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { log } = require("console");

// middelwares ke liye
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    fs.readdir(path.join(__dirname, "files"), (err, files) => {
        res.render("index", { files: files });
    });
}); // INDEX

app.post("/create", (req, res) => {
    const title = req.body.title.split(' ').join(''); 
    const filename = `${title}.txt`;
    if (!title) {
        return res.status(400).send("Title is required");
    }
    fs.writeFile(path.join(__dirname, "files", filename), req.body.description, (err) => {
        res.redirect("/");
    });
}); // CREATE

app.get("/file/:filename", (req, res) => {
    fs.readFile(path.join(__dirname, "files", req.params.filename), "utf-8", (err, data) => {
        res.render("show", { title: req.params.filename, description: data });
    });
}); // SHOW



app.get("/edit/:filename", (req, res) => {
    fs.readFile(path.join(__dirname, "files", req.params.filename), "utf-8", (err, data) => {
        res.render("editpage", { title: req.params.filename, description: data, submitText: "Update Task" });
    });
}); // EDIT get ke liye

app.post("/edit/:filename", (req, res) => {
    const oldFilename = req.params.filename;
    const newTitle = req.body.newTitle.split(' ').join('') + ".txt";
    const newDescription = req.body.newDescription;
    fs.rename(path.join(__dirname, "files", oldFilename), path.join(__dirname, "files", newTitle), (err) => {
        fs.writeFile(path.join(__dirname, "files", newTitle), newDescription, (err) => {
            res.redirect("/file/" + newTitle);
        });
    });
}); // EDIT post ke liye

app.get("/delete/:filename", (req, res) => {
    const filename = req.params.filename;

    fs.unlink(path.join(__dirname, "files", filename), (err) => {
        res.redirect("/");
    });
}); // DELETE

app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
});

