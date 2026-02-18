const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/test1')

const userSchema= mongoose.Schema({
    name:String,
    email:String,
    imgUrl:String
})

const user = mongoose.model('user',userSchema);

module.exports = user;