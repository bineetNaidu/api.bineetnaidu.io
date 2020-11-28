import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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

const UrlShortener = mongoose.model('UrlShortener', urlShortenerSchema);

export default UrlShortener;
