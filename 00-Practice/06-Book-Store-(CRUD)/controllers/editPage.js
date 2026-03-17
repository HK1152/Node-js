const booksModel = require("../model/booksModel");

const getEditPage = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await booksModel.findById(id);
        if (!book) {
            return res.status(404).send("Book not found");
        }
        res.render("edit", { book });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getEditPage;
