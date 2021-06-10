import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin',
    email: 'admin',
    password: bcrypt.hashSync('admin', 10),
    isAdmin: true,
  },
  {
    name: 'Test',
    email: 'test@test.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
