import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: false, unique: true },
    isAdmin: { type: Boolean, required: true, default: false },
    verified: { type: Boolean, required: true, default: false },
    formSubmitted: { type: Boolean, required: false, default: false },
    formId: { type: String, required: false },
    membersFormId: { type: Array, required: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
