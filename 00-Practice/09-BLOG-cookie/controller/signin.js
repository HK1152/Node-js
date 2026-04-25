const jwt = require("jsonwebtoken");
const userModel = require("../model/user");

const signinGet = (req, res) => {
    res.render("signin", {
        title: "Sign In",
        error: null
    });
};

const signinPost = async (req, res) => {
    const { email, password } = req.body;
    
   const user = await userModel.findOne({email});
   if (!user) {
    return res.render("signin", { title: "Sign In", error: "User not found" });
   }

   if (user.password !== password) {
    return res.render("signin", { title: "Sign In", error: "Invalid password" });
   }
   
    const token = jwt.sign({user: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
    
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/blog");
};

const signOut = async(req,res)=>{
    res.clearCookie("token");
    console.log("User logged out successfully");
    res.redirect("/signin");
};

module.exports = {
    signinGet,
    signinPost,
    signOut
}; 