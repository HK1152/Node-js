const express= require("express");
const app= express();

const userModel = require("./usermodel.js");

app.get("/",(req,res)=>{
    res.send("Hello World!");
});

app.get('/create',async (req,res)=>{
    let createdUser= await userModel.create({
        name:"hk",
        username:"vishnu",
        email:"hkVishnu@gmail.com"
    })
    res.send(createdUser);
})

app.get('/update',async (req,res)=>{
    // userModel.findOneUpdate(findeone,update,{new:true})
    let updatedUser= await userModel.findOneAndUpdate({username:"patel"},{name:"kavya patel"},{new:true})
    res.send(updatedUser);
})

app.get('/read',async (req,res)=>{
    let readUser= await userModel.find()
    // let readUser= await userModel.find({username:"vishnu"}) // selected find
    res.send(readUser);
})

app.get('/delete',async( req, res)=>{
    let deletedUser= await userModel.findOneAndDelete({username:"patel"})
    res.send(deletedUser);
})

app.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000/");
});