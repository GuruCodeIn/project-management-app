import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  projectId: mongoose.Types.ObjectId;
  completed: boolean;
  createdAt: Date;
}

const TaskSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ITask>("Task", TaskSchema);
