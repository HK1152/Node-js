const booksModel = require("../model/booksModel");

const showAllBooks = async (req, res) => {
    try {
        const books = await booksModel.find();
        res.status(200).render("index", { books: books });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = showAllBooks;