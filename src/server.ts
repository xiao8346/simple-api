import * as http from 'http';

import { app } from './app';

const port = process.env.PORT || 3300;

http.createServer(app).listen(port, () => {
  console.log('listen 3300 port');
});
