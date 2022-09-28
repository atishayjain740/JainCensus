import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import {
  generateToken,
  generateFormID,
  sendOTPVerificationSMS,
  sendConfirmationSMS,
} from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import Form from '../models/formModel.js';
import { ObjectId } from 'mongodb';
import UserOTPVerification from '../models/userOTPVerification.js';
import { validateForm } from '../formValidations.js';

const userRouter = express.Router();

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        if (user.verified) {
          res.send({
            _id: user._id,
            name: user.name,
            phoneNumber: user.phoneNumber,
            password: user.password,
            verified: user.verified,
            isAdmin: user.isAdmin,
            formSubmitted: user.formSubmitted,
            formId: user.formId,
            token: generateToken(user),
          });

          return;
        } else {
          return sendOTPVerificationSMS(user, res);
        }
      }
    }
    res.status(401).send({ message: 'Invalid phone number or password' });
  })
);

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    let { name, phoneNumber, password } = req.body;

    name = name.trim();
    phoneNumber = +phoneNumber.trim();
    password = password.trim();

    // Validations
    if (name == '' || phoneNumber == '' || password == '') {
      res.status(401).send({ message: 'Empty input fields!' });
    } else if (!/^[a-zA-Z ]{2,30}$/.test(name)) {
      res.status(401).send({ message: 'Invalid name entered!' });
    } else if (password.length < 8) {
      res.status(401).send({ message: 'Password is too short!' });
    } else {
      User.find({ phoneNumber }).then((result) => {
        // User already exists.
        if (result.length) {
          res.status(401).send({
            message: 'User with the provided number already exists',
          });
        } else {
          // Create a new user.
          const newUser = new User({
            name: name,
            phoneNumber: phoneNumber,
            password: bcrypt.hashSync(password),
          });
          newUser
            .save()
            .then((result) => {
              // Handle account verification.
              return sendOTPVerificationSMS(result, res);
            })
            .catch((err) => {
              console.log(err);
              res.status(401).send({
                message: 'An error occurred while saving user account',
              });
            });

          /*res.send({
            _id: newUser._id,
            name: newUser.name,
            phoneNumber: newUser.phoneNumber,
            password: newUser.password,
            verified: newUser.verified,
            isAdmin: newUser.isAdmin,
            token: generateToken(newUser),
          });*/
        }
      });
    }
  })
);

userRouter.post(
  '/verifyOTP',
  expressAsyncHandler(async (req, res) => {
    try {
      let { userId, otp } = req.body;
      if (!userId || !otp) {
        throw Error('Empty OTP details are not allowed');
      } else {
        const userOTPVerificationRecords = await UserOTPVerification.find({
          userId,
        });

        if (userOTPVerificationRecords.length <= 0) {
          // No records found.
          throw new Error(
            'Account record does not exists or has been verified already. Please sign up or log in'
          );
        } else {
          // user otp records exists.
          const { expiredAt } = userOTPVerificationRecords[0];
          const hashedOtp = userOTPVerificationRecords[0].otp;

          if (expiredAt < Date.now()) {
            // User otp record has expired.
            await UserOTPVerification.deleteMany({ userId });
            throw new Error('Code has expired. Please request again');
          } else {
            const validOtp = await bcrypt.compare(otp, hashedOtp);
            if (!validOtp) {
              // Provided otp is wrong.
              throw new Error('Invalid OTP. Please try again');
            } else {
              await User.updateOne({ _id: userId }, { verified: true });
              await UserOTPVerification.deleteMany({ userId: userId });

              res.send({
                message: 'User verified successfully',
              });
            }
          }
        }
      }
    } catch (error) {
      res.status(401).send({
        message: error.message,
      });
    }
  })
);

userRouter.post(
  '/formSubmit',
  expressAsyncHandler(async (req, res) => {
    try {
      var formData = req.body.formData;

      // Validate Form
      if (!validateForm(formData)) {
        res.send({
          success: false,
          message: 'Fill the form correctly!',
        });

        return;
      }

      // Generate ID. Add to form.
      const id = await generateFormID(req.body.phoneNumber, formData);
      if (id == null || id == '') {
        res.send({
          success: false,
          message: 'Error occurred! Id not generated!',
        });

        return;
      }

      formData.basicFormInfo['generatedId'] = id;

      const newForm = new Form({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        isAdmin: req.body.isAdmin,
        form: formData,
      });
      const form = await newForm.save();
      const user = await User.updateOne(
        { phoneNumber: req.body.phoneNumber },
        { $set: { formSubmitted: true, formId: newForm._id } }
      );

      await sendConfirmationSMS(formData.familyFormInfo.headNumber, id);

      res.send({
        success: true,
        formSubmitted: true,
        formId: newForm._id,
        generatedId: id,
      });
    } catch (err) {
      res.send({
        success: false,
        message: 'Error occurred! Cannot submit form',
      });
    }
  })
);

/*userRouter.get('/form/:phoneNumber', async (req, res) => {
  const form = await Form.findOne({ phoneNumber: req.params.phoneNumber });
  if (form) {
    res.send(form);
  } else {
    res.status(404).send({ message: 'Form not found' });
  }
});*/

userRouter.get('/form/:id', async (req, res) => {
  try {
    var id = req.params.id;

    const form = await Form.findOne({ _id: ObjectId(id) });
    if (form) {
      res.send(form);
    } else {
      res.status(404).send({ message: 'Form not found' });
    }
  } catch (err) {
    res.status(404).send({ message: 'Error occurred' });
  }
});

userRouter.get('/form/id/:id', async (req, res) => {
  try {
    var id = req.params.id;

    const form = await Form.findOne({ _id: ObjectId(id) });
    if (form) {
      res.send(form);
    } else {
      res.status(404).send({ message: 'Form not found' });
    }
  } catch (err) {
    res.status(404).send({ message: 'Error occurred' });
  }
});

export default userRouter;
