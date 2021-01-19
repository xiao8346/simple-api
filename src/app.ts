import { STATUS_CODES } from 'http';
// import * as util from 'util';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import * as Q from 'q';
import * as morgan from 'morgan';

import { modelsFactory } from './models';
import { routesFactorey } from './routes';
import { config } from './config';

export const app = express();

(mongoose as any).Promise = Q.Promise;
// mongoose.set('debug', (collectionName: string, method: string, query: any, options: any) => {
//   const projection = { ...options.projection };
//   const cloneOptions = { ...options };
//   delete cloneOptions.projection;

//   console.log(`
//     db.${collectionName}.${method}(
//       ${util.inspect(query)}, 
//       ${util.inspect(projection)}, 
//       ${util.inspect(cloneOptions)}
//     );
//   `);
// });
const conn = mongoose.createConnection('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));

app.set('config', config);

app.set('models', modelsFactory(conn));

app.use(routesFactorey(app, conn));

app.use(function (err, req: express.Request, res: express.Response, next: express.NextFunction) {
  err.status = err.status || 500;
  err.message = STATUS_CODES[err.status];
  res.status(err.status);
  res.json(err);
});
