import { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface Animal extends Document {
  id: string;
  name: string;
  type: string;
  feedNumber: number;
}

export const AnimalSchema = new Schema({
  id: { type: String, default: uuidv4, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  feedNumber: { type: Number, required: true },
});
