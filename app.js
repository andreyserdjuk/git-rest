"use strict";
const process = require('process');
const express = require('express');
const ProtectedGitRepo_1 = require('./ProtectedGitRepo');
const router_1 = require('./router');
/**
 * Colon-separated list of available repositories paths.
 * @example: /path1:/path2:/home/user/repo3.
 */
const GIT_REST_PATH = process.env.GIT_REST_PATH;
if (typeof GIT_REST_PATH === 'undefined' || GIT_REST_PATH.toString() === '') {
    console.log('Need to set GIT_REST_PATH env variable. For example: GIT_REST_PATH=/path/to/repo1:/path/to/repo2 node app.js');
}
else {
    let app = express();
    let pathMap = new Map();
    for (let pathPair in GIT_REST_PATH.split(':')) {
        let key, value;
        [key, value] = pathPair.split('=');
        pathMap.set(key, value);
    }
    let gitRepo = new ProtectedGitRepo_1.ProtectedGitRepo(pathMap);
    let router = express.Router();
    router_1.setupRouter(router, gitRepo);
    app.use('/', router);
    const port = process.env.PORT || 3000;
    app.listen(port, function () {
        console.log('Example app listening on port %d!', port);
    });
}
