import mongoose from 'mongoose';

const { Schema } = mongoose;

interface ILink {
  label: string;
  url: string;
  icon: string;
}

interface LinkDoc extends mongoose.Document {
  label: string;
  url: string;
  icon: string;
}

interface LinkModel extends mongoose.Model<LinkDoc> {
  // eslint-disable-next-line no-unused-vars
  build(data: ILink): LinkDoc;
}

const LinkSchema = new Schema(
  {
    label: { type: String, required: true, unique: true },
    url: { type: String, required: true, unique: true },
    icon: { type: String, required: true },
  },
  {
    versionKey: false,
    // eslint-disable-next-line comma-dangle
  }
);

// eslint-disable-next-line no-use-before-define
LinkSchema.statics.build = (data) => new Link(data);

const Link = mongoose.model<LinkDoc, LinkModel>('Link', LinkSchema);

export default Link;
