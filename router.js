"use strict";
function setupRouter(router, gitRepo) {
    // deny non-available repository paths
    router.use((req, res, next) => {
        if (typeof req.query.path === 'undefined') {
            res.end('"path" query parameter is mandatory');
        }
        else if (!gitRepo.isAvailable(req.query.path)) {
            res.end('Repository is not available\n');
            console.log('Repository "%s" is not available', req.query.path);
        }
        else {
            next();
        }
    });
    // define the home page route
    router.get('/git/branches', (req, res) => {
        gitRepo.getRepo(req.query.path).branch((err, data) => {
            res.json(data);
        });
    });
    router.get('/repositories', (req, res) => res.json([...gitRepo.getAvailablePaths().keys()]));
    // middleware that is specific to this router
    router.use(function timeLog(req, res, next) {
        console.log('Time: ', Date.now(), req.query, req.body);
        next();
    });
}
exports.setupRouter = setupRouter;
