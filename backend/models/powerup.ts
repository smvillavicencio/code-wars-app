import { Schema, model, Document } from 'mongoose';

export interface Powerup extends Document {
  name: string;
  description: string;
  duration?: number;
  cost: number;
  type: number;
  code: string;
}

const PowerupSchema = new Schema<Powerup>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
  },
  cost: {
    type: Number,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  }
});

const PowerupModel = model<Powerup>('Powerup', PowerupSchema);

export default PowerupModel;
