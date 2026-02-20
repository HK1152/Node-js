const { log } = require('console');
const cookieParser= require('cookie-parser');
const express = require('express');
const app = express();

app.use(cookieParser())

app.get('/',(req,res)=>{
    res.cookie('name','hk');
    res.send('hk')
})

app.listen(3000,()=>{
    console.log('http://localhost:3000/');
    
})