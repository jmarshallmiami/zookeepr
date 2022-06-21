const router = require('express').Router();

const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    if (results) {
        res.json(results);
    } else {
        res.send(404);
    }
});

router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/animals', (req, res) => {
    // set id based on the what the next index in the array will be
    req.body.id = animals.length.toString();

    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        // add animal to JSON file and to the animals array
        const animal = createNewAnimal(req.body, animals);
        res.json(req.body);
    }
});

module.exports = router