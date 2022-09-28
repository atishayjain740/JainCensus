import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    seq: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Counter = mongoose.model('Counter', counterSchema);
export default Counter;
