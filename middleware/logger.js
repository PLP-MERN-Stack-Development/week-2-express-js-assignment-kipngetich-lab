// middleware/logger.js
const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - IP: ${req.ip}`);
    next(); // Pass control to the next middleware in the stack
};

module.exports = logger;