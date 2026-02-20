
const express = require('express');
const app = express();

const cookieParser= require('cookie-parser');
const bcrypt= require("bcrypt");
const jwt = require('jsonwebtoken');

let password = "yeMeraPasswordHai";
let code ='$2b$10$CPmJ7msvmX4HbLO1kO6Mr.XYy8TDqqcalBH7xG/xdAXp02BP4t6Iyc'

app.use(cookieParser())


app.get('/',(req,res)=>{
   let token = jwt.sign({password:password},'secretkey');
   res.cookie("token",token);
   res.send('done');
    });


app.get('/read',(req,res)=>{
    let token = req.cookies.token;
    // console.log(tokan);
    
   let data = jwt.verify(token, 'secretkey');
   res.send(data);
});

app.listen(3000,()=>{
    console.log('http://localhost:3000/');
    
});