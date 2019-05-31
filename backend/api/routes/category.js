const express = require('express');
const app = express();
const category = require('../models/db_category');

app.get('/categories', async (req, res) => {
    let categories = await category.getCategories();
    res.send(categories);
});



module.exports = app;