const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.cookies.token;
    try {

        if (!token) {
            return res.redirect("/signin");
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode.user;
        next();
    } catch (err) {
        console.log(err);
        res.clearCookie("token");
        return res.redirect("/signin");
    }
};

module.exports = auth;