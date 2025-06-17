// middleware/auth.js
const { UnauthorizedError } = require('../errors');
require('dotenv').config(); // Ensure dotenv is loaded to access process.env

const authenticate = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    // It's crucial to use an environment variable for API keys in production
    const expectedApiKey = process.env.API_KEY;

    if (!apiKey) {
        return next(new UnauthorizedError('API key is missing.'));
    }

    if (apiKey !== expectedApiKey) {
        return next(new UnauthorizedError('Invalid API key.'));
    }

    // If authentication is successful, proceed to the next middleware/route handler
    next();
};

module.exports = authenticate;