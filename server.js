const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// In-memory product list
let products = [
    { id: 1, name: 'Notebook', price: 5.49 },
    { id: 2, name: 'Black Marker', price: 1.99 }
];

// 1. Get all products
app.get('/products', (req, res) => {
    res.json(products);
});

// 2. Get a product by ID
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// 3. Add a new product
app.post('/products', (req, res) => {
    const newProduct = req.body;
    if (!newProduct.name || !newProduct.price) {
        return res.status(400).json({ message: 'Invalid product data' });
    }
    newProduct.id = products.length + 1;
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// 4. Update a product by ID
app.put('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        const { name, price } = req.body;
        if (name) product.name = name;
        if (price) product.price = price;
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// 5. Delete a product by ID
app.delete('/products/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex !== -1) {
        const deletedProduct = products.splice(productIndex, 1);
        res.json(deletedProduct[0]);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
