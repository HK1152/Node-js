const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/bookstore");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
};

module.exports = dbConnection;