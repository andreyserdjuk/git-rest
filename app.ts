import * as process from 'process';
import * as express from 'express';
import { ProtectedGitRepo } from './ProtectedGitRepo';
import { setupRouter } from './router';
import { existsSync } from 'fs';

/**
 * Colon-separated list of available repositories paths.
 * @example: pathAlias1=/absolute-path1:pathAlias2=/absolute-path2
 * 
 * get all repositories:
 * curl -XGET http://localhost:3000/repositories | python -m json.tool
 * 
 * get all branches from path1:
 * curl -XGET http://localhost:3000/git/branch?path=pathAlias1 | python -m json.tool
 */
const GIT_REST_PATH = process.env.GIT_REST_PATH;

if (typeof GIT_REST_PATH === 'undefined' || GIT_REST_PATH.toString() === '') {
  console.log('Need to set GIT_REST_PATH env variable. For example: GIT_REST_PATH=/path/to/repo1:/path/to/repo2 node app.js')
} else {
  let app = express();
  
  // register paths provided with GIT_REST_PATH
  let pathMap = new Map<string, string>();
  for(let pathPair of GIT_REST_PATH.split(':')) {
    let pathAlias, path;
    [pathAlias, path] = pathPair.split('=');

    if (!existsSync(path)) {
      console.log(`Given for pathAlias1 "${pathAlias}" path ${path} does not exists!`);
    }

    pathMap.set(pathAlias, path);
  }
  
  let gitRepo = new ProtectedGitRepo(pathMap);
  let router = express.Router();
  
  setupRouter(router, gitRepo);
  app.use('/', router);

  app.use((err, req, res, next) => {
    console.error(err);
    res.json({message: err.message, data: []});
  });

  const port = process.env.PORT || 3000;
  app.listen(port, function () {
    console.log('Example app listening on port %d!', port);
  });
}