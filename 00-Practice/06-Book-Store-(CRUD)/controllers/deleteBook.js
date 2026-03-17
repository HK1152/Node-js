const booksModel = require("../model/booksModel");

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        await booksModel.findByIdAndDelete(id);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = deleteBook;
