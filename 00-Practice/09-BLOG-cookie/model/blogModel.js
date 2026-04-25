const mongoose = require("mongoose");


const Blog = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const blogModel = new mongoose.model("Blog", Blog);
module.exports = blogModel;