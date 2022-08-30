import jwt from 'jsonwebtoken';

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

export const generateFormID = (phoneNumber, formData, count) => {
  const aamnaya = formData.additionalFormInfo.aamnaya;
  var aamnayaCode = '';
  if (aamnaya === 'दिगम्बर') {
    aamnayaCode = 'DG';
  } else if (aamnaya === 'श्वेताम्बर') {
    aamnayaCode = 'SW';
  }
  const generatedId =
    'WJC' +
    formData.basicFormInfo.countryCode +
    aamnayaCode +
    phoneNumber.substring(phoneNumber.length - 2) +
    count;

  return generatedId;
};
