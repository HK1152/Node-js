const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/CRUD');
    } catch (err) {
        console.error(err.message);
    }};

module.exports = connectDB;