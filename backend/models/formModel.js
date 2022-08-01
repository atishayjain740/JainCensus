import mongoose from 'mongoose';

const formSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, required: true, default: false },
    form: { type: Object, required: true },
  },
  {
    timestamps: true,
  }
);

const Form = mongoose.model('Form', formSchema);
export default Form;
