const express = require("express");

const app = express();

app.get("/",(req,res)=>{
    res.send('ye chalu karke, home page pe aa gae')
})

app.get('/about',(req,res)=>{
    res.send('ye about page pe aa gae')
})

app.get('/contact',(req,res)=>{
    res.send('ye contact page pe aa gae')
})

app.get('/name/:name',(req,res)=>{
    res.send('ha bhai, tera naam hai :' + req.params.name)
})

app.get("/search", (req, res) => {
    res.send("Name is " + req.query.name + " and age is " + req.query.age);
});
app.get('/math', (req,res)=>{
    res.send('a='+ req.query.a + 'b='+ req.query.b + '\n a+b='+(Number(req.query.a)+Number(req.query.b)))
})

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});