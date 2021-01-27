/* eslint-disable camelcase */
import mongoose from 'mongoose';

const { Schema } = mongoose;

// ? An interface that describe the properties that
// ? are required to create a new URLSHORTENER data
interface UrlShortenerInterface {
  original_url: string;
  slug: string;
}

// ? An interface that describe the properties
// ? that a URLSHORTENER Document has
interface UrlShortenerDoc extends mongoose.Document {
  original_url: string;
  slug: string;
}

// ? An interface that  desc the props
// ? that a URLSHORTENER model has!
interface UrlShortenerModel extends mongoose.Model<UrlShortenerDoc> {
  // eslint-disable-next-line no-unused-vars
  build(data: UrlShortenerInterface): UrlShortenerDoc;
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

// eslint-disable-next-line arrow-body-style
urlShortenerSchema.statics.build = (data: UrlShortenerInterface) => {
  // eslint-disable-next-line no-use-before-define
  return new UrlShortener(data);
};

const UrlShortener = mongoose.model<UrlShortenerDoc, UrlShortenerModel>(
  'UrlShortener',
  // eslint-disable-next-line comma-dangle
  urlShortenerSchema
);

export default UrlShortener;
