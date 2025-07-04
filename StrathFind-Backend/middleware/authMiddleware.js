// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // 1. Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // 2. Check if token exists
    if (!token) {
        return res.status(401).json({
            error: 'Authentication required',
            solution: 'Please include a valid bearer token'
        });
    }

    // 3. Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user to request
        next();
    } catch (err) {
        return res.status(401).json({
            error: 'Invalid token',
            details: err.name === 'TokenExpiredError'
                ? 'Token has expired'
                : 'Malformed token'
        });
    }
};