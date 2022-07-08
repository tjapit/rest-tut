const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    // get the token from request header
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access Denied");

    try {
        // verify token
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        // verify() returns the payload specified in sign() after a successful login
        req.user = verified;
        // move on to the next route that required auth
        next();
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
};

module.exports = verifyToken;
