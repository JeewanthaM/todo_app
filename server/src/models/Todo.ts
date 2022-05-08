import mongoose, { Document, Schema } from "mongoose";

export interface ITodo {
  title: string;
  description: string;
  status: string;
  endDate: string;
}

export interface ITodoModel extends ITodo, Document {}

const TodoSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    endDate: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<ITodoModel>("Todo", TodoSchema);
