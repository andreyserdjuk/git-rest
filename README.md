# git-rest

Provides REST access to Git functionality.  
Based on [express](https://github.com/expressjs/express) and [simple-git](https://github.com/steveukx/git-js).

Run application:  
```bash
PORT=3000 GIT_REST_PATH=repo1_unique_name=/path/to/repo1:repo2_unique_name=/path/to/repo2 node app.js
```
PORT - listening on port  
GIT_REST_PATH - colon-separated list of paths allowed to application