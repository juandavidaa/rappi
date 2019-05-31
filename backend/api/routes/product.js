const express = require('express');
const app = express();
const product = require('../models/db_product');

app.get('/products', async (req, res) => {
    let products = await product.getProducts();
    res.send(products);
});

app.get('/products/categories', async (req, res) => {
    let categories = req.query.categories.split(",");
    let response = await product.getProductsByCategories(categories);
    res.send(response);
});

module.exports = app;