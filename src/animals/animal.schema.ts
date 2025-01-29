import { Schema, Document } from 'mongoose';

export interface Animal extends Document {
  id: number;
  name: string;
  type: string;
  feedNumber: number;
}

export const AnimalSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  age: { type: Number, required: true },
});
