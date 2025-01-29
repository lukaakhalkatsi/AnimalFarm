import { Schema, Document } from 'mongoose';

export interface PigHappiness extends Document {
  initial: string;
  happy: string;
  putin: string;
}

export const PigHappinessSchema = new Schema(
  {
    initial: { type: String, required: true },
    happy: { type: String, required: true },
    putin: { type: String, required: true },
  },
  {
    collection: 'PigHappiness',
  },
);
