
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config({ path: "../.env" });

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("harekrishna");
});

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
