import { debug } from 'util';
import { Router } from 'express-serve-static-core';
import {ProtectedGitRepo} from './ProtectedGitRepo';

export function setupRouter(router: Router, gitRepo: ProtectedGitRepo) {
  // deny non-available repository paths
  router.use((req, res, next) => {
    if (req.path.match(/^\/git/)) {
      if (typeof req.query.path === 'undefined') {
        res.end('"path" query parameter is mandatory');
      } else if (!gitRepo.isAvailable(req.query.path)) {
        res.end('Repository is not available\n');
        console.log('Repository "%s" is not available', req.query.path);
      }
    }

    next();
  });

  // define the home page route
  router.get('/git/branch', (req, res) => {
    gitRepo.getRepo(req.query.path).branch((err, data) => {
      res.json({message: '', data: data});
    });
  });

  // show all registered repositories paths when application loaded
  router.get('/repositories', (req, res) =>
    res.json({message: '', data: [...gitRepo.getAvailablePaths().keys()]})
  );

  // middleware that is specific to this router
  router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now(), req.query, req.body);
    next();
  });
}