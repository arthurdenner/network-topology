import mongoose from 'mongoose';

const wordSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  meaning: {
    type: [String],
    required: true,
  },
});

export default mongoose.model('Word', wordSchema);
