const BookModel = require("../model/booksModel");

const create = async (req,res)=>{
    const {img,title,author,price} = req.body;
    const book = new BookModel({img,title,author,price});
    await book.save();
    res.redirect("/");
}

module.exports = create;