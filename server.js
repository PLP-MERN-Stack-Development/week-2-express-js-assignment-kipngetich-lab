// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./middleware/logger');
const authenticate = require('./middleware/auth');
const productRoutes = require('./routes/productRoutes');
const { CustomError } = require('./errors');
require('dotenv').config(); // Load environment variables from .env file

//const { v4: uuidv4 } = require('uuid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Custom logger middleware
app.use(logger);

// Middleware to parse JSON request bodies
// express.json() is the built-in alternative to body-parser.json() for modern Express.
app.use(express.json());
// If you prefer body-parser: app.use(bodyParser.json());

// Apply authentication middleware to all /api routes
// The / route (Hello World) is intentionally excluded from authentication for simplicity.
app.use('/api', authenticate);

// Task 1: Basic Express server with "Hello World" route
app.get('/', (req, res) => {
    res.send('Hello World! Welcome to the Products API.');
});

// Task 2 & 5: RESTful API Routes (Product routes)
// All product-related routes are defined in a separate router
app.use('/api/products', productRoutes);

// Task 4: Global Error Handling Middleware
// This middleware catches errors passed by `next(err)` from any route or middleware.
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the full error stack for debugging purposes

    // Handle custom operational errors (e.g., NotFoundError, ValidationError)
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            // Include specific validation errors if they exist
            ...(err.errors && { errors: err.errors })
        });
    }

    // Handle any other unexpected errors (e.g., programming errors)
    res.status(500).json({
        status: 'error',
        message: 'Something went wrong on the server. Please try again later.',
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access "Hello World" at http://localhost:${PORT}/`);
    console.log(`Access API at http://localhost:${PORT}/api/products`);
    console.log(`Remember to include 'x-api-key' header for /api routes.`);
});
