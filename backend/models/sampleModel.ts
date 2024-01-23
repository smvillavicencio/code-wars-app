import { Schema, model, Document } from 'mongoose';

interface Sample extends Document {
  data: string;
}

const SampleSchema = new Schema<Sample>({
  data: {
    type: String,
    required: true,
  },
});

const SampleModel = model<Sample>('Sample', SampleSchema);

export default SampleModel;
