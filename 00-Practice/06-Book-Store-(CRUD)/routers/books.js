const express = require('express')
const router = express.Router();
const create = require('../controllers/create');
const showAllBooks = require('../controllers/showBooks');
const Update = require('../controllers/updateBook');
const getEditPage = require('../controllers/editPage');
const deleteBook = require('../controllers/deleteBook');

//create
router.get("/add",(req,res)=>{
    res.render("add");
})
router.post('/add',create);

//read
router.get("/", showAllBooks);

//update
router.get("/edit/:id", getEditPage);
router.post("/edit/:id", Update);

//delete
router.get("/delete/:id", deleteBook);

module.exports = router;