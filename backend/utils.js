import jwt from 'jsonwebtoken';
import UserOTPVerification from './models/userOTPVerification.js';
import { createRequire } from 'module';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import Counter from './models/counterModel.js';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

export const sendOTPVerificationSMS = async (newUser, res) => {
  try {
    const require = createRequire(import.meta.url);
    const otpGenerator = require('otp-generator');
    var otpGenerated = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    // Hash otp.
    const hasedOtp = bcrypt.hashSync(otpGenerated);

    const existOTPVerification = await UserOTPVerification.findOne({
      userId: newUser._id,
    });
    if (existOTPVerification) {
      await UserOTPVerification.deleteMany({ userId: newUser._id });
    }

    const newOTPVerification = await new UserOTPVerification({
      userId: newUser._id,
      otp: hasedOtp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 600000,
    });
    // Save otp record.
    await newOTPVerification.save();

    // Send SMS.
    SendOTPSMS(newUser.phoneNumber, otpGenerated);

    // For dev. Write otp to a file.
    /*const fs = require('fs');
    fs.writeFileSync(
      'D:/PracticeProjects/JainCensus/backend/temp/userotp.txt',
      otpGenerated
    );*/

    return res.send({
      _id: newUser._id,
      name: newUser.name,
      phoneNumber: newUser.phoneNumber,
      password: newUser.password,
      verified: newUser.verified,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser),
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};

const SendOTPSMS = async (number, otp) => {
  /*const senderId = 'AXNDRA';
  const apiKey = 'VHSXkTGCPgNe3HQr';
  const templateId = '';
  const message = 'OTP: ' + otp;

  const url =
    'http://ishika.poweredsms.com/vb/apikey.php?apikey=' +
    apiKey +
    '&senderid=' +
    senderId +
    '&templateid=' +
    templateId +
    '&number=' +
    number +
    '&message=' +
    message;
  */
  const message =
    'Welcome to World Jain Census\n' +
    'OTP: ' +
    otp +
    '\nThis OTP is valid only for 10 minutes';

  const url =
    'http://web.poweredsms.com/submitsms.jsp?user=jaincens&key=8b9ad41f0cXX&mobile=' +
    number +
    '&message=' +
    message +
    '&senderid=Census&accusage=1';
  try {
    const response = await axios.get(url);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const generateFormID = async (phoneNumber, formData) => {
  var seqId;
  const aamnaya = formData.additionalFormInfo.aamnaya;
  var aamnayaCode = '';
  if (aamnaya === 'दिगम्बर') {
    aamnayaCode = 'DG';
  } else if (aamnaya === 'श्वेताम्बर') {
    aamnayaCode = 'SW';
  }

  const counter = await Counter.findOneAndUpdate(
    { id: 'form' },
    { $inc: { seq: 1 } },
    { new: true }
  );

  if (counter == null) {
    const newVal = new Counter({ id: 'form', seq: 1 });
    newVal.save();
    seqId = 1;
  } else {
    seqId = counter.seq;
  }

  console.log(seqId.toString(10).length);
  for (let i = seqId.toString(10).length; i < 6; i++) {
    seqId = '0' + seqId;
  }

  const generatedId =
    'WJC' + aamnayaCode + phoneNumber.substring(phoneNumber.length - 2) + seqId;

  return generatedId;
};

export const sendConfirmationSMS = async (number, id) => {
  /*const senderId = 'AXNDRA';
  const apiKey = 'VHSXkTGCPgNe3HQr';
  const templateId = '';
  const message = 'OTP: ' + otp;

  const url =
    'http://ishika.poweredsms.com/vb/apikey.php?apikey=' +
    apiKey +
    '&senderid=' +
    senderId +
    '&templateid=' +
    templateId +
    '&number=' +
    number +
    '&message=' +
    message;
  */

  const message =
    'Congratulations! ID Card was generated successfully.\nID no. +' +
    id +
    '\nFor more details, visit our website';

  const url =
    'http://web.poweredsms.com/submitsms.jsp?user=jaincens&key=8b9ad41f0cXX&mobile=' +
    number +
    '&message=' +
    message +
    '&senderid=Census&accusage=1';
  try {
    const response = await axios.get(url);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
