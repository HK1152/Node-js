const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: String,
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
   
});

const post = mongoose.model('Post', postSchema);

module.exports = post;