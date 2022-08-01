import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Atishay',
      phoneNumber: '9582778359',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Mahesh',
      phoneNumber: '9140838754',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
  ],
};

export default data;
