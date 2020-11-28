import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//? An interface that describe the properties that
//? are required to create a new URLSHORTENER data
interface UrlShortenerInterface {
  original_url: string;
  slug: string;
}

//? An interface that  desc the props
//? that a URLSHORTENER model has!
interface UrlShortenerModel extends mongoose.Model<UrlShortenerDoc> {
  build({ original_url, slug }: UrlShortenerInterface): UrlShortenerDoc;
}

//? An interface that describe the properties
//? that a URLSHORTENER Document has
interface UrlShortenerDoc extends mongoose.Document {
  original_url: string;
  slug: string;
}

const urlShortenerSchema = new Schema({
  original_url: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

urlShortenerSchema.statics.build = (data: UrlShortenerInterface) => {
  return new UrlShortener(data);
};

const UrlShortener = mongoose.model<UrlShortenerDoc, UrlShortenerModel>(
  'UrlShortener',
  urlShortenerSchema
);

export default UrlShortener;
