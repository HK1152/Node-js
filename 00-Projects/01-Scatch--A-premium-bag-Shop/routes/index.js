const express = require('express')
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedin.js")
const flash = require('connect-flash');
const authController = require('../controllers/authController');
const ProductModel = require('../models/product-model');
const userModel = require('../models/user-model.js');


router.get('/', (req, res) => {
    let error = req.flash('error');
    res.render("index", { error, loggedin: !!req.user, user: req.user });
})


router.get('/shop', isloggedin, async (req, res) => {
    try {
        let products = await ProductModel.find();
        let success = req.flash('success');
        res.render('shop', { products, success, user: req.user, loggedin: !!req.user });
    } catch (err) {
        console.error(err);
        res.send(err.message);
    }
})


router.get('/cart', isloggedin, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email }).populate('cart');

    let totalMRP = user.cart.reduce((sum, p) => sum + (Number(p.price) || 0), 0);
    let totalDiscount = user.cart.reduce((sum, p) => sum + (Number(p.discount) || 0), 0);
    let bill = totalMRP - totalDiscount + 20; 
    res.render('cart', { user, totalMRP, totalDiscount, bill });
})

router.get('/add-to-cart/:productid', isloggedin, async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email });
        if (!user) {
            req.flash('error', 'User not found');
            return res.redirect('/shop');
        }
       
        user.cart.push(req.params.productid);
        await user.save();
        req.flash('success', 'Product added to cart');
        res.redirect('/shop');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding product to cart');
    }
});

router.get('/logout', isloggedin, authController.logout);

module.exports = router;