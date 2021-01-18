import { STATUS_CODES } from 'http';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import * as Q from 'q';
import * as morgan from 'morgan';

import { modelsFactory } from './models';
import { routesFactorey } from './routes';
import { config } from './config';

const app = express();
(mongoose as any).Promise = Q.Promise;
const conn = mongoose.createConnection('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.set('config', config);

app.set('models', modelsFactory(conn));

app.use(routesFactorey(app));

app.use(function (err, req, res, next) {
  err.status = err.status || 500;
  err.message = STATUS_CODES[err.status];
  res.status(err.status);
  res.json(err);
});

const port = process.env.PORT || 3300;

app.listen(port, () => {
  console.log('listen 3300 port');
});
