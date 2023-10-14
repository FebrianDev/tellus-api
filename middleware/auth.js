const jwt = require("jsonwebtoken")

const {ACCESS_TOKEN} = process.env

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["api-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;