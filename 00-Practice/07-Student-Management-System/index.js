const express = require('express');
const app = express();
const connectDB = require('./config/db.js');
const studentRouter = require('./router/studentRouter.js');

connectDB();

app.set('view engine', 'ejs'); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', studentRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});