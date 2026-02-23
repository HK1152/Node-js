const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/DataAssociation');

const usageSchema = new mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]

});

const User = mongoose.model('User', usageSchema);

module.exports = User;