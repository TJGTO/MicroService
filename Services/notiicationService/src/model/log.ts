import mongoose, { Schema, Document } from "mongoose";

export interface ILog extends Document {
  type: string;
  message: string;
  timestamp: Date;
}

const LogSchema: Schema = new Schema({
  type: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Log = mongoose.model<ILog>("Log", LogSchema);
