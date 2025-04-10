const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const uri = 'mongodb+srv://vonghiaky12a7:Y3jmAqoTrWCDtfjY@test.jtia3.mongodb.net/?retryWrites=true&w=majority&appName=test';

async function seedUsers() {
  try {
    await mongoose.connect(uri, {
      dbName: 'WebKhoaHoc',
    });

    await User.deleteMany({});

    const hashedPassword = await bcrypt.hash('123456', 10);

    await User.insertMany([
      {
        username: 'student1',
        email: 'student1@example.com',
        password: hashedPassword,
        role: 'student'
      },
      {
        username: 'teacher1',
        email: 'teacher1@example.com',
        password: hashedPassword,
        role: 'teacher'
      },
      {
        username: 'admin1',
        email: 'admin1@example.com',
        password: hashedPassword,
        role: 'admin'
      }
    ]);

    console.log('User seeding completed.');
    process.exit(0);
  } catch (error) {
    console.error('User seeding error:', error);
    process.exit(1);
  }
}

seedUsers();