const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }
    jwt.verify(refreshToken, 'refresh_secret', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Failed to authenticate refresh token" });
        }
        req.userId = decoded.userId;
        next();
    });
};

module.exports = verifyToken;
