//require li
const express = require("express");
const app = express();

// is app.use me chalega, ise middleware kehte hain. isme jo next hai uske through next middleware yaa final handler ko call karega, agar nahi hoga to next function chalega. like app.get()
app.use(function(req, res, next) {
    console.log("meddleware chalega ");
    next(); // jab bhi kam ho jaaye to ye chalae  
}); 

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/about", (req, res) => {
    res.send("aa gae about page pe");
});

app.get("/contact", (req, res) => {
    res.send("aa gae contact page pe");
});


app.get("/home", (req, res,next) => {
   return next(new Error("Something went wrong")) // error ko next middleware pe pass karega or ye cmd pe error show karega
})

app.use(function(error,req,res,next){
    console.log(error.stack);  // cmd pe error show karega
    res.status(500).send("error page"); // frontend pe error show karega
})

app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000/");
    console.log("Server is running on port http://localhost:3000/about");
    console.log("Server is running on port http://localhost:3000/contact");
});