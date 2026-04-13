require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const posterRouter = require('./Router/PosterRouter');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static('uploads/image'));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', posterRouter);

connectDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {    
    console.log('Server is running on http://localhost:' + port);
});