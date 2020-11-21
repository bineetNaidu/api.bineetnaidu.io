// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';
/* eslint-disable import/extensions */
/* eslint-disable no-console */
// ***** IMPORT *****
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import CreateError from 'http-errors';
import logger from 'morgan';
import path from 'path';
import connectDB from './config/database.js';

import maplifyRoutes from './routes/maplify.js'; // ? Maplify
import urlShortenerRoutes from './routes/urlShortener.router.js'; // ? Url Shrotener

// ***** App Config *****
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();
connectDB();

// ***** Middlewares *****
app.use(express.json());
app.use(logger('dev'));
app.set('view engine', 'ejs');
app.set(path.join('views'));
app.use(cors());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'"],
      scriptSrc: ["'unsafe-inline'", "'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      workerSrc: ["'self'", 'blob:'],
      objectSrc: [],
      imgSrc: ["'self'", 'blob:', 'data:', 'https://images.unsplash.com/'],
    },
    // eslint-disable-next-line comma-dangle
  })
);

// ***** Unmount Routes *****
app.get('/', (_, res) => res.json({ Greet: 'Hello World' }));
app.use('/api/v1/maplify', maplifyRoutes);
app.use('/api/v1/urlshortener', urlShortenerRoutes);

//! catch 404 and forward to error handler
app.all('*', (req, res, next) => next(new CreateError(404)));

//! error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  res.json({ error: err.message, status: statusCode });
});

// **** Listeners ****
app.listen(process.env.PORT || 4242, () => {
  console.log('-----------------------------------------');
  console.log('>>>>>>> API SERVER HAS STARTED <<<<<<<<');
  console.log('-----------------------------------------');
});
