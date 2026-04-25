const express = require("express");
const printblogs = require("../controller/print");
const auth = require("../middleware/auth");
const {signinGet,signinPost,signOut} = require("../controller/signin");
const router = express.Router();

router.get("/signin", signinGet);
router.post("/signin", signinPost);

router.get("/blog",auth,printblogs);

router.get("/signout",signOut);

module.exports = router;
