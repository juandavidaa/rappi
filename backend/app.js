const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
process.env.db = '../db/';
// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.use(require('./api/routes/product'));
app.use(require('./api/routes/category'));

app.listen(3000, () => {
    console.log('port: 3000');
});

