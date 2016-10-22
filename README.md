# git-rest

Provides REST access to Git functionality.  
Based on express and simple-git.   

Run application:  
```bash
PORT=3000 GIT_REST_PATH=/path/to/repo1:/path/to/repo2 node app.js
```
PORT - listening on port  
GIT_REST_PATH - colon-separated list of paths allowed to application