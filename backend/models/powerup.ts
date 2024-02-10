import { Schema, model, Document } from 'mongoose';

export interface Powerup extends Document {
  name: string;
  type: number;
  code: string;
  tier: {
    [tier_no: string]: {
      description: string;
      duration: number;
      cost: number;
    };
  };
}

export interface PowerupInfo {
  _id: string;
  code: string;
  type: number;
  tier: string;
  duration: string;
  cost: string;
  from?: string;
  target?: string;
  timestamp: Date;
}

const PowerupSchema = new Schema<Powerup>({
  name: {
    type: String,
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
  },
  tier: {
    type: Object,
    required: true,
  }
});

const PowerupModel = model<Powerup>('Powerup', PowerupSchema);

export default PowerupModel;
