// ***** IMPORT *****
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import logger from 'morgan';
import connectDB from './config/database';
import dotenv from 'dotenv';
import NotFoundError from './utils/errors/NotFoundError';
import ExpressErrorHandler from './utils/errors/ExpressErrorHandler';
import 'express-async-errors';

//* Routers
import maplifyRoutes from './routes/maplify'; // ? Maplify
import urlShortenerRoutes from './routes/urlShortener'; // ? Url Shrotener

//* Security Content allowed sites
import {
  connectSrcUrls,
  fontSrcUrls,
  scriptSrcUrls,
  styleSrcUrls,
} from './utils/contentPoliciesAllowedSites';

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
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'", ...connectSrcUrls],
      scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      workerSrc: ["'self'", 'blob:'],
      objectSrc: [],
      imgSrc: ["'self'", 'blob:', 'data:', 'https://images.unsplash.com/'],
      fontSrc: ["'self'", ...fontSrcUrls],
    },
  })
);

// ***** Unmount Routes *****
app.get('/', (_, res) => res.json({ Greet: 'Hello World 🤟' }));
app.use('/api/v1/maplify', maplifyRoutes);
app.use('/api/v1/urlshortener', urlShortenerRoutes);

//! Not found page error
app.all('*', () => {
  throw new NotFoundError();
});
// ! Error Handlers
app.use(ExpressErrorHandler);

// **** Listeners ****
app.listen(process.env.PORT || 4242, () => {
  console.log('-----------------------------------------');
  console.log('>>>>>>> API SERVER HAS STARTED <<<<<<<<');
  console.log('-----------------------------------------');
});
