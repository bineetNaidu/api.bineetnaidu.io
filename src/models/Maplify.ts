import mongoose from 'mongoose';

const { Schema } = mongoose;

// ? An interface that describe the properties
// ? that are required to create a new MAPLIFY data
interface MaplifyInterface {
  lat: number;
  lng: number;
  desc: string;
  city: string;
}

// ? An interface that describe the properties
// ? that a User Document has
export interface MaplifyDoc extends mongoose.Document {
  lat: number;
  lng: number;
  desc: string;
  city: string;
}

// ? An interface that  desc the props
// ? that a USER model has!
interface MaplifyModel extends mongoose.Model<MaplifyDoc> {
  // eslint-disable-next-line no-unused-vars
  build(data: MaplifyInterface): MaplifyDoc;
}

const MaplifySchema = new Schema({
  lat: Number,
  lng: Number,
  desc: String,
  city: String,
});

// eslint-disable-next-line no-use-before-define
MaplifySchema.statics.build = (data: MaplifyInterface) => new Maplify(data);

const Maplify = mongoose.model<MaplifyDoc, MaplifyModel>(
  'Maplify',
  // eslint-disable-next-line comma-dangle
  MaplifySchema
);

export default Maplify;
