const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userModel = require('./models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const path = require('path');
const cookies = require('cookie-parser');

const port = 3000;

//middleware
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookies());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/create', async (req, res) => {
  const { username, email, password, age } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.status(500).send('Error generating salt');

    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error hashing password');
      }

      let createUser = await userModel.create({ username, email, password: hash, age });

      let token = jwt.sign({email},"secretkey");
      res.cookie('token', token);
      res.redirect('/login');
    });
  });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({ email });

  if (!user) return res.status(404).send('User not found');

  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) return res.status(500).send('Error comparing passwords');
    
    if (isMatch) {
      let token = jwt.sign({ email: user.email }, "secretkey");
      res.cookie('token', token);
      res.redirect('/dashboard');
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

  app.get('/dashboard', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).send('Access denied. No token provided.');

    jwt.verify(token, "secretkey", (err, decoded) => {
      if (err) return res.status(401).send('Invalid token');
      res.render('dashbord');
    });
  });

app.get('/logout', (req, res) => {
  res.cookie('token','');
  res.redirect('/');
});



  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });