import { appendFile } from 'fs';
import * as process from 'process';
import * as express from 'express';
import {router} from './router';

let app = express();
app.use('/birds', router); 

let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Example app listening on port %d!', port);
});