const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Sample product data
let products = [
    { id: 143, name: 'Notebook', price: 5.49 },
    { id: 144, name: 'Black Marker', price: 1.99 }
];

// Example request - GET /products
app.get('/products', (req, res) => {
    res.json(products);
});

// Example request - GET /products/:id
app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(x => x.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Example request - POST /products
app.post('/products', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).send(); // Return a 201 status with no content
});

// Example request - PUT /products/:id
app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedProduct = req.body;
    const product = products.find(x => x.id === id);
    if (product) {
        Object.assign(product, updatedProduct); // Update product properties
        res.status(204).send(); // Return a 204 status with no content
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Example request - DELETE /products/:id
app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(x => x.id === id);
    if (productIndex !== -1) {
        products.splice(productIndex, 1); // Remove product from array
        res.status(204).send(); // Return a 204 status with no content
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Product server running at http://localhost:${port}`);
});