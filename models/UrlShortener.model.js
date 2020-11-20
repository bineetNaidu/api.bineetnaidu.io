import mongoose from 'mongoose';

const { Schema } = mongoose;

const urlSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
    // eslint-disable-next-line comma-dangle
  }
);

export default mongoose.model('UrlShortener', urlSchema);
