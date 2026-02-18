const express = require("express");
const app = express();
const path = require("path");
const userModel = require('./models/user.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});
app.get('/read', async (req, res) => {
    try {
        let users = await userModel.find();
        res.render("read", { users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching users');
    }
});

app.post('/create',async (req, res)=>{
    let{name,email,imgUrl} = req.body;

    let createUser = await userModel.create({
        name, // name:name
        email, // email:email
        imgUrl,}) // imgUrl:imgUrl

    res.redirect('/read');
})



app.get('/delete/:id',async (req, res)=>{
    let id = req.params.id;
    await userModel.findByIdAndDelete({_id:id});
    res.redirect('/read');

})


app.get('/edit/:id',async (req, res)=>{
    let id = req.params.id;
    let user = await userModel.findById({_id:id});
    res.render('edit',{user});
})

app.post('/update/:id',async (req, res)=>{
    let id = req.params.id;
    let{name,email,imgUrl} = req.body;
    let update = await userModel.findByIdAndUpdate({_id:id},{name,email,imgUrl},{new:true});
    res.redirect('/read');
})

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000/");
});