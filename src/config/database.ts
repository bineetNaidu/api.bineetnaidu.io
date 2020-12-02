import mongoose from 'mongoose';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const connectDB: () => Promise<void> = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      keepAlive: true,
      useCreateIndex: true,
    });
    console.log('>>>>> mongoDB Connected <<<<<');
  } catch (er) {
    console.log(er.message);
    process.exit(1);
  }
};

export default connectDB;
