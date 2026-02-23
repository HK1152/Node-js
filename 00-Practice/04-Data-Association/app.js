const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static('public'));

const isLoggedIn = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.redirect('/login');
    else {
        let data = jwt.verify(token, 'hk1152');
        req.user = data;
        next();
    }
};



app.get('/', (req, res) => {
    res.render('index');
});

app.post('/register', async (req, res) => {
    try {
        const { name, username, age, email, password } = req.body;

        const existing = await userModel.findOne({ email });
        if (existing) return res.status(400).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await userModel.create({ name, username, age, email, password: hash });

        const token = jwt.sign({ email: user.email, userid: user._id }, 'hk1152');
        res.cookie('token', token, { httpOnly: true });

        return res.status(201).send('User registered successfully');
    } catch (err) {
        console.error('Register error:', err);
        if (!res.headersSent) return res.status(500).json({ message: 'Server error' });
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (!user) return res.status(400).send(  'Invalid email or password' );

   bcrypt.compare(password, user.password,(err, result) => {
       if(result){
           let token = jwt.sign({ email: user.email, userid: user._id }, 'hk1152');
           res.cookie('token', token, { httpOnly: true });
           res.status(200).redirect('/profile'); 
       }
       else res.redirect('/login');
    });
  

  
});

app.get('/profile',isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate('posts');
    res.render('profile', { user });
});

app.get('/post/:id',isLoggedIn, async (req, res) => {
   let post = await postModel.findById(req.params.id).populate('user');

    if(post.likes.indexOf(req.user.userid)===-1){
        post.likes.push(req.user.userid);
    }
    else{
        post.likes.splice(post.likes.indexOf(req.user.userid),1);
    }

   await post.save();
   res.redirect('/profile');
});

app.get('/edit/:id',isLoggedIn, async (req, res) => {
   let post = await postModel.findById(req.params.id).populate('user');

    res.render('edit',{post});
});

app.post('/update/:id',isLoggedIn, async (req, res) => {
   let post = await postModel.findOneAndUpdate({_id:req.params.id}, {content:req.body.content});
   res.redirect('/profile');
});

app.post('/post',isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    let post = await postModel.create({
        user: user._id,
        content: req.body.content
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile');
});


app.get('/logout', (req, res) => {
    res.cookie('token');
    res.redirect('/login');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
 
});