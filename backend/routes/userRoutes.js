import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import Form from '../models/formModel.js';

const userRouter = express.Router();

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          phoneNumber: user.phoneNumber,
          password: user.password,
          isAdmin: user.isAdmin,
          formSubmitted: user.formSubmitted,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid phone number or password' });
  })
);

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      password: user.password,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

userRouter.post(
  '/formSubmit',
  expressAsyncHandler(async (req, res) => {
    const newForm = new Form({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      isAdmin: req.body.isAdmin,
      form: req.body.formData,
    });
    const form = await newForm.save();
    const user = await User.updateOne(
      { phoneNumber: req.body.phoneNumber },
      { $set: { formSubmitted: true } }
    );

    res.send({
      formSubmitted: true,
    });
  })
);

userRouter.get('/form/:phoneNumber', async (req, res) => {
  const form = await Form.findOne({ phoneNumber: req.params.phoneNumber });
  if (form) {
    res.send(form);
  } else {
    res.status(404).send({ message: 'Form not found' });
  }
});

export default userRouter;
