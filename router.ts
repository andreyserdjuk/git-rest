import { debug } from 'util';
import { Router } from 'express-serve-static-core';
import {ProtectedGitRepo} from './ProtectedGitRepo';

export function setupRouter(router: Router, gitRepo: ProtectedGitRepo) {
  // deny non-available repository paths
  router.use((req, res, next) => {
    if (req.path.match(/^\/git/)) {
      if (typeof req.query.path === 'undefined') {
        res.end('"path" query parameter is mandatory');
        return;
      } else if (!gitRepo.isAvailable(req.query.path)) {
        res.json({message: 'Repository is not available', data: []});
        console.log('Repository "%s" is not available', req.query.path);
        return;
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