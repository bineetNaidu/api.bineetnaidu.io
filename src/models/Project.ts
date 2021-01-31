/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';

const { Schema } = mongoose;

// eslint-disable-next-line no-shadow
export enum Status {
  Ongoing = 'ongoing',
  Planning = 'planning',
  Completed = 'completed',
}

interface ProjectAttrs {
  name: string;
  url?: string;
  github?: string;
  completed: boolean;
  featured: boolean;
  description: string;
  status: Status;
}

interface ProjectDoc extends mongoose.Document {
  name: string;
  url?: string;
  github?: string;
  completed: boolean;
  featured: boolean;
  description: string;
  status: Status;
}

interface ProjectModel extends mongoose.Model<ProjectDoc> {
  build(data: ProjectAttrs): ProjectDoc;
}

const ProjectSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    url: { type: String, default: undefined },
    github: { type: String, default: undefined },
    completed: { type: Boolean, default: false, required: true },
    featured: { type: Boolean, default: false },
    description: { type: String, unique: true, required: true },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.Planning,
    },
  },
  // eslint-disable-next-line comma-dangle
  { versionKey: false }
);

// eslint-disable-next-line arrow-body-style
ProjectSchema.statics.build = (data: ProjectAttrs) => {
  // eslint-disable-next-line no-use-before-define
  return new Project(data);
};

const Project = mongoose.model<ProjectDoc, ProjectModel>(
  'Project',
  // eslint-disable-next-line comma-dangle
  ProjectSchema
);

export default Project;
