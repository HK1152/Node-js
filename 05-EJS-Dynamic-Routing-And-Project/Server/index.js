const express = require("express");
const app = express();
const path = require("path");


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")));
app.set('view engine','ejs');

app.get("/",function(req,res){
    res.render("index")
});

app.get("/user",function(req,res){
    res.send("user dikh gaya")
});
app.get("/:kuchhBhi",function(req,res){
    res.send(`<h1>par ye jo likha hai "${req.params.kuchhBhi}" wo galat hai </h1>`)
});

app.get("/:kuchhBhi/age",function(req,res){
    res.send(`<h1>par ye jo likha hai "${req.params.kuchhBhi}" wo galat hai </h1>`)
});

app.listen(5000,function(){
    console.log("bhai, hu jato rahyo ");
    console.log("http://localhost:5000/");
    console.log("http://localhost:5000/user");
    
    
})