/* eslint-disable no-console */
import mongoose from 'mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      keepAlive: true,
    });
    console.log('>>>>> mongoDB Connected <<<<<');
  } catch (er) {
    console.log(er.message);
    process.exit(1);
  }
};

export default connectDB;
