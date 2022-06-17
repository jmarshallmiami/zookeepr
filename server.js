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
// ungate stylesheets
app.use(express.static('public'));


const { animals } = require('./data/animals');



app.get('/api/animals', (req, res) => {
    let result = animals;
    if (req.query) {
        result = filterByQuery(req.query, result);
    }
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if(result){
        res.json(result);
    } else {
        res.send(404);
    }
});

app.post('/api/animals', (req, res) => {
    // set id based on the what the next index in the array will be
    req.body.id = animals.length.toString();

    if(!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        // add animal to JSON file and to the animals array
        const animal = createNewAnimal(req.body, animals);
        res.json(req.body);
    }
});

// homepage for the server
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// server connected to animals page
app.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, './public/animals.html'));
});

// server connected to Zookeepers page
app.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

// catch-all wildcard route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});