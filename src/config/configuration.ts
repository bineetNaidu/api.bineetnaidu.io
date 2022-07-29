import 'dotenv/config';
import { Configuration } from '../shared/types';

const configuration: () => Configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 4242,
  accessKey: process.env.ACCESS_KEY,
  jwtSecret: process.env.JWT_SECRET,
  environment: process.env.NODE_ENV,
  database: {
    uri: process.env.MONGO_URI,
    testUri: process.env.MONGO_TEST_URI,
  },
});

export { configuration };
