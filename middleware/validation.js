// middleware/validation.js
const { ValidationError } = require('../errors');

// Middleware for validating product creation (POST)
const validateProduct = (req, res, next) => {
    const { name, description, price, category, inStock } = req.body;
    const errors = [];

    if (typeof name !== 'string' || name.trim().length === 0) {
        errors.push({ field: 'name', message: 'Name must be a non-empty string.' });
    }
    if (typeof description !== 'string' || description.trim().length === 0) {
        errors.push({ field: 'description', message: 'Description must be a non-empty string.' });
    }
    if (typeof price !== 'number' || price <= 0) {
        errors.push({ field: 'price', message: 'Price must be a positive number.' });
    }
    if (typeof category !== 'string' || category.trim().length === 0) {
        errors.push({ field: 'category', message: 'Category must be a non-empty string.' });
    }
    // Check if inStock is a boolean and it's explicitly provided
    if (typeof inStock !== 'boolean') {
        errors.push({ field: 'inStock', message: 'inStock must be a boolean (true/false).' });
    }

    if (errors.length > 0) {
        return next(new ValidationError('Product data validation failed.', errors));
    }
    next();
};

// Middleware for validating product updates (PUT)
// Fields are optional, but if present, they must be valid.
const validateProductUpdate = (req, res, next) => {
    const { name, description, price, category, inStock } = req.body;
    const errors = [];
    let hasUpdateFields = false;

    if (name !== undefined) {
        hasUpdateFields = true;
        if (typeof name !== 'string' || name.trim().length === 0) {
            errors.push({ field: 'name', message: 'Name must be a non-empty string if provided.' });
        }
    }
    if (description !== undefined) {
        hasUpdateFields = true;
        if (typeof description !== 'string' || description.trim().length === 0) {
            errors.push({ field: 'description', message: 'Description must be a non-empty string if provided.' });
        }
    }
    if (price !== undefined) {
        hasUpdateFields = true;
        if (typeof price !== 'number' || price <= 0) {
            errors.push({ field: 'price', message: 'Price must be a positive number if provided.' });
        }
    }
    if (category !== undefined) {
        hasUpdateFields = true;
        if (typeof category !== 'string' || category.trim().length === 0) {
            errors.push({ field: 'category', message: 'Category must be a non-empty string if provided.' });
        }
    }
    if (inStock !== undefined) {
        hasUpdateFields = true;
        if (typeof inStock !== 'boolean') {
            errors.push({ field: 'inStock', message: 'inStock must be a boolean (true/false) if provided.' });
        }
    }

    // If no fields are provided for update, it's a validation error
    if (!hasUpdateFields) {
        errors.push({ message: 'At least one field (name, description, price, category, inStock) must be provided for update.' });
    }

    if (errors.length > 0) {
        return next(new ValidationError('Product update validation failed.', errors));
    }
    next();
};

module.exports = {
    validateProduct,
    validateProductUpdate
};