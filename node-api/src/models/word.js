import mongoose from 'mongoose';

const wordSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    meaning: {
      type: [String],
      required: true,
    },
  },
  { usePushEach: true }
);

export default mongoose.model('Word', wordSchema);
