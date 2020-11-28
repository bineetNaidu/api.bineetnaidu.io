import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//? An interface that describe the properties
//? that are required to create a new MAPLIFY data
interface MaplifyInterface {
  lat: number;
  lng: number;
  desc: string;
  city: string;
}

//? An interface that  desc the props
//? that a USER model has!
interface MaplifyModel extends mongoose.Model<MaplifyDoc> {
  build({ city, desc, lat, lng }: MaplifyInterface): MaplifyDoc;
}

//? An interface that describe the properties
//? that a User Document has
interface MaplifyDoc extends mongoose.Document {
  lat: number;
  lng: number;
  desc: string;
  city: string;
}

const MaplifySchema = new Schema({
  lat: Number,
  lng: Number,
  desc: String,
  city: String,
});

MaplifySchema.statics.build = (data: MaplifyInterface) => {
  return new Maplify(data);
};

const Maplify = mongoose.model<MaplifyDoc, MaplifyModel>(
  'Maplify',
  MaplifySchema
);

export default Maplify;
