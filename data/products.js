// data/products.js
const { v4: uuidv4 } = require('uuid');

// In-memory array to store product data.
// In a real application, this would be replaced by a database.
let products = [
    {
        id: uuidv4(),
        name: 'Laptop Pro X',
        description: 'Powerful laptop for professional use with high performance.',
        price: 1500,
        category: 'Electronics',
        inStock: true
    },
    {
        id: uuidv4(),
        name: 'Ergonomic Keyboard',
        description: 'Comfortable keyboard for extended typing sessions, reduces strain.',
        price: 75,
        category: 'Accessories',
        inStock: true
    },
    {
        id: uuidv4(),
        name: 'Wireless Mouse',
        description: 'High-precision wireless mouse with long battery life.',
        price: 30,
        category: 'Accessories',
        inStock: false
    },
    {
        id: uuidv4(),
        name: '4K Monitor',
        description: 'Ultra HD monitor for stunning visuals and immersive experience.',
        price: 350,
        category: 'Electronics',
        inStock: true
    },
    {
        id: uuidv4(),
        name: 'Gaming Headset',
        description: 'Immersive sound for gaming with noise-canceling microphone.',
        price: 90,
        category: 'Gaming',
        inStock: true
    },
    {
        id: uuidv4(),
        name: 'USB-C Hub',
        description: 'Multi-port USB-C hub for modern laptops.',
        price: 45,
        category: 'Accessories',
        inStock: true
    },
    {
        id: uuidv4(),
        name: 'External SSD 1TB',
        description: 'Fast and portable storage solution.',
        price: 120,
        category: 'Storage',
        inStock: true
    }
];

module.exports = products;