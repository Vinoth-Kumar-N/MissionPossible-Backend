const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(400).send({message : "Token is Required"});

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(400).send({message : "Invalid Token"});
        req.user = user;
        next();
    });
}


module.exports = verifyToken;