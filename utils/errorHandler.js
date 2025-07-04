// utils/errorHandler.js
// This utility function wraps asynchronous route handlers
// to automatically catch any errors and pass them to Express's error handling middleware.
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;