// errors/index.js
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // Mark as operational error (known, expected error)
        Error.captureStackTrace(this, this.constructor); // Capture stack trace for debugging
    }
}

class NotFoundError extends CustomError {
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}

class ValidationError extends CustomError {
    constructor(message = 'Validation failed', errors = []) {
        super(message, 400);
        this.errors = errors; // Array of specific validation errors
    }
}

class UnauthorizedError extends CustomError {
    constructor(message = 'Unauthorized: Invalid or missing authentication credentials') {
        super(message, 401);
    }
}

class ForbiddenError extends CustomError {
    constructor(message = 'Forbidden: You do not have permission to access this resource') {
        super(message, 403);
    }
}

module.exports = {
    CustomError,
    NotFoundError,
    ValidationError,
    UnauthorizedError,
    ForbiddenError
};