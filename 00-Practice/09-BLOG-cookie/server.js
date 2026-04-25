require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const authRouter = require("./router/authRouter");
const cookieParser = require('cookie-parser');

app.use(cookieParser());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", authRouter);

//mongoose
const connectDB = require("./config/db");
connectDB();




app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
