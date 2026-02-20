
const express = require('express');
const app = express();
const bcrypt= require("bcrypt");

let password = "yeMeraPasswordHai";
let code ='$2b$10$CPmJ7msvmX4HbLO1kO6Mr.XYy8TDqqcalBH7xG/xdAXp02BP4t6Iyc'

app.get('/',(req,res)=>{
   bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash);
        res.send(hash);
    });

    });
    });

app.get('/verify',(req,res)=>{
    bcrypt.compare(password, code, function(err, result) {
        // result == true
        console.log(result);
        res.send(result);
    })
    });

app.listen(3000,()=>{
    console.log('http://localhost:3000/');
    
});