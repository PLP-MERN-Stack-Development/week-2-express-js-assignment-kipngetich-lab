// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
let products = require('../data/products'); // Our in-memory data store
const asyncHandler = require('../utils/errorHandler'); // Utility to handle async errors
const { NotFoundError, ValidationError } = require('../errors'); // Custom error classes
const { validateProduct, validateProductUpdate } = require('../middleware/validation'); // Validation middleware

// Important: Specific routes should come before more general routes (like /:id)
// otherwise, "stats" could be interpreted as an ID.

// GET /api/products/stats: Get product statistics (e.g., count by category)
router.get('/stats', asyncHandler((req, res) => {
    const stats = products.reduce((acc, product) => {
        const category = product.category || 'Uncategorized'; // Handle products without a category
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {});
    res.json(stats);
}));

// GET /api/products: List all products with filtering, pagination, and search
router.get('/', asyncHandler((req, res) => {
    let filteredProducts = [...products]; // Create a mutable copy

    const { category, search, page = 1, limit = 10 } = req.query;

    // Filtering by category
    if (category) {
        filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    // Search by name
    if (search) {
        const searchTerm = search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchTerm));
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    if (isNaN(pageNum) || pageNum < 1) {
        throw new ValidationError('Page number must be a positive integer.');
    }
    if (isNaN(limitNum) || limitNum < 1) {
        throw new ValidationError('Limit must be a positive integer.');
    }

    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;

    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    res.json({
        total: filteredProducts.length,
        page: pageNum,
        limit: limitNum,
        products: paginatedProducts
    });
}));

// GET /api/products/:id: Get a specific product by ID
router.get('/:id', asyncHandler((req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
        throw new NotFoundError(`Product with ID ${req.params.id} not found.`);
    }
    res.json(product);
}));

// POST /api/products: Create a new product
router.post('/', validateProduct, asyncHandler((req, res) => {
    const { name, description, price, category, inStock } = req.body;
    const newProduct = {
        id: uuidv4(), // Generate a unique ID
        name,
        description,
        price,
        category,
        inStock
    };
    products.push(newProduct);
    res.status(201).json(newProduct); // 201 Created status
}));

// PUT /api/products/:id: Update an existing product
router.put('/:id', validateProductUpdate, asyncHandler((req, res) => {
    const productId = req.params.id;
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        throw new NotFoundError(`Product with ID ${productId} not found.`);
    }

    // Prevent changing the ID via request body
    const { id, ...updateData } = req.body;
    if (id && id !== productId) {
        throw new ValidationError('Cannot change product ID via the request body. Use the URL parameter.');
    }

    // Update only the provided fields
    products[productIndex] = { ...products[productIndex], ...updateData };
    res.json(products[productIndex]);
}));

// DELETE /api/products/:id: Delete a product
router.delete('/:id', asyncHandler((req, res) => {
    const productId = req.params.id;
    const initialLength = products.length;
    products = products.filter(p => p.id !== productId);

    if (products.length === initialLength) {
        // If length hasn't changed, product was not found
        throw new NotFoundError(`Product with ID ${productId} not found.`);
    }
    res.status(204).send(); // 204 No Content status for successful deletion
}));

module.exports = router;