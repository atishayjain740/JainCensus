import mongoose from 'mongoose';

const userOTPVerificationSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: String, required: true },
  expiresAt: { type: String, required: true },
});

const UserOTPVerification = mongoose.model(
  'UserOTPVerification',
  userOTPVerificationSchema
);
export default UserOTPVerification;
