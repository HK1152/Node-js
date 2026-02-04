import express from "express";
import { getAllUsers, getUserById } from "../controllers/userController.js";

const router = express.Router();

router.get("/all", getAllUsers);
router.get("/:id", getUserById);
// router.post("/create", createUser);
// router.put("/update/:id", updateUser);
// router.delete("/delete/:id", deleteUser);

export default router;