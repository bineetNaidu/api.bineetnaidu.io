// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';
/* eslint-disable import/extensions */
/* eslint-disable no-console */
// ***** IMPORT *****
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import createError from 'http-errors';
import logger from 'morgan';
import connectDB from './config/database.js';

import maplifyRoutes from './routes/maplify.js'; // ? Maplify

// ***** App Config *****
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();
connectDB();

// ***** Middlewares *****
app.use(express.json());
app.use(logger('dev'));
app.use(cors());
app.use(helmet());

// ***** Unmount Routes *****
app.get('/', (_, res) => res.json({ Greet: 'Hello World' }));
app.use('/api/v1/maplify', maplifyRoutes);

//! catch 404 and forward to error handler
app.use((_, __, next) => {
  next(createError(404));
});

//! error handler
app.use((err, _, res) => {
  res.status(err.status || 500);
  res.json({ error: err.message, status: err.status });
});

// **** Listeners ****
app.listen(process.env.PORT, () => {
  console.log('-----------------------------------------');
  console.log('>>>>>>> API SERVER HAS STARTED <<<<<<<<');
  console.log('-----------------------------------------');
});
