const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
    }
    catch (err) {
        console.error('Database connection error:', err);
    }
};

module.exports = connectDB;