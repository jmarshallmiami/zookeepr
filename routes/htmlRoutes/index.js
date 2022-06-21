const path = require('path');
const router = require('express').Router();


// homepage for the server
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// server connected to animals page
router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, './public/animals.html'));
});

// server connected to Zookeepers page
router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

// catch-all wildcard route
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

module.exports = router;