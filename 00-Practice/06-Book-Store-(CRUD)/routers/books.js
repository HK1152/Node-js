const express = require('express')
const router = express.Router();
const create = require('../controllers/create');

router.get("/add",(req,res)=>{
    res.render("add");
})
router.post('/add',create);

module.exports = router;