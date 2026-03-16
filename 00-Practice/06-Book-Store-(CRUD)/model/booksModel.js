const mongoose = require("mongoose");
const dbConnection = require("../config/db-connection");

dbConnection();

const bookSchema = new mongoose.Schema({
    img:String,
    title: String,
    author: String,
    price: Number
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;