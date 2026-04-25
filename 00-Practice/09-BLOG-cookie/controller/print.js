const blogModel = require("../model/blogModel");

const printBlogs = async (req, res) => {
    const blogs = await blogModel.find();
    res.status(200).render("printBlog", {
        success:true,
        message:"Blogs fetched successfully",
        data:blogs
    })
}

module.exports = printBlogs;