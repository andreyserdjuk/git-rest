"use strict";
const express = require('express');
let app = express();
let router = express.Router();
exports.router = router;
// var simpleGit = require('simple-git')( workingDirPath );
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// define the home page route
router.get('/', (req, res) => {
    res.end('Birds home page\n');
});
// define the about route
router.get('/about', (req, res) => {
    res.send('About birds\n');
});
