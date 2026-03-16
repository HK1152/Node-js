const express = require('express');
const app = express();
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
// const multer = require('multer');

app.use(express.static('public'));
app.set('view engine', 'ejs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/image/uploads')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    crypto.randomBytes(16, (err, bytes) => {
      if (err) return cb(err);
      const fn = bytes.toString('hex') + path.extname(file.originalname);
      cb(null, fn);
    })
  }
})

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/upload', upload.single('image'), (req, res) => {
    // Handle file upload logic here
    res.send('File uploaded successfully!');
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});