const express = require('express')
const router = express.Router();
const upload = require('../config/multer-config.js');
const productModel = require('../models/product-model');
const isOwnerLoggedin = require('../middlewares/isOwnerLoggedin');

router.post('/create', isOwnerLoggedin, upload.single("image"), async (req, res) => {
    try {
        const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

        const product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
        });

        req.flash('success', 'Product created successfully');
        res.redirect('/owners/admin');
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

module.exports = router;