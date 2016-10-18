"use strict";
const process = require('process');
const express = require('express');
const router_1 = require('./router');
let app = express();
app.use('/birds', router_1.router);
let port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Example app listening on port %d!', port);
});
