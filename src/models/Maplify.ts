import mongoose from 'mongoose';

const { Schema } = mongoose;

const MaplifySchema = new Schema({
  lat: Number,
  lng: Number,
  desc: String,
  city: String,
});

export default mongoose.model('Maplify', MaplifySchema);
