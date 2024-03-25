// authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

   const token  =  req.get("Authorization").split(" ")[1]
   console.log(token,"this is extracted token in auth middlewear")

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, 'secret', (err, decode) => {
        if (err) {
            return res.status(403).json({ message: "Failed to authenticate token" });
        }
        req.userId = decode.userId;
        next();
    });
};

module.exports = authMiddleware;
