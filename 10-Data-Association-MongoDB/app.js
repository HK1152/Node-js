const express = require('express');
const app = express();
const port = 3000;
const userModel = require('./models/user');
const postModel = require('./models/posts');


app.get('/', (req, res) => {
  res.send('Hello World!');
}); 

app.get('/create', async (req, res) => {
 let user = await userModel.create({
    username: 'kavya patel',
    email: 'kavyapatel@a.com',
    age: 25
  });
  res.send(user);
});


app.get('/post/create', async (req, res) => {

  let post = await postModel.create({
    postdata: 'This is my first post',
    user: '69998a7c2a2cb0fba0835ac1'
  });

  let user = await userModel.findById('69998a7c2a2cb0fba0835ac1');
  user.posts.push(post);
  await user.save();

  res.send({  post, user });
  
});

app.listen(port, () => {  console.log(`Example app listening at http://localhost:${port}`);
});