import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  name: string;
  description?: string;
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IProject>("Project", ProjectSchema);
