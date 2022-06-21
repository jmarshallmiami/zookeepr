const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

const express = require('express');
const res = require('express/lib/response');
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// routes for serving html and api calls
app.use('/api',apiRoutes);
app.use('/',htmlRoutes);

// ungate stylesheets
app.use(express.static('public'));


const { animals } = require('./data/animals');


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});