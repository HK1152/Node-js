const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const booksRouter = require("./routers/books");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", booksRouter);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});