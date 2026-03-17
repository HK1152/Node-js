const booksModel = require("../model/booksModel");

const Update = async (req,res)=>{
    const {id} = req.params;
    const {img,title,author,price} = req.body;
    try {
        const book = await booksModel.findByIdAndUpdate(id,{img,title,author,price});
        res.redirect("/");
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

module.exports = Update;