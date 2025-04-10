const mongoose = require('mongoose');
const User = require('../models/User');
const SupportTicket = require('../models/SupportTicket');

const uri = 'mongodb+srv://vonghiaky12a7:Y3jmAqoTrWCDtfjY@test.jtia3.mongodb.net/?retryWrites=true&w=majority&appName=test';

async function seedSupportTickets() {
  try {
    await mongoose.connect(uri, {
      dbName: 'WebKhoaHoc',
    });

    await SupportTicket.deleteMany({});

    const users = await User.find();

    await SupportTicket.insertMany([
      {
        user: users[0]?._id,
        email: users[0]?.email || 'student1@example.com',
        subject: 'Vấn đề đăng nhập',
        message: 'Tôi không thể đăng nhập vào tài khoản.',
        status: 'open'
      },
      {
        user: users[1]?._id,
        email: users[1]?.email || 'teacher1@example.com',
        subject: 'Câu hỏi về bài học',
        message: 'Bài học số 2 có video không?',
        status: 'open'
      }
    ]);

    console.log('Support ticket seeding completed.');
    process.exit(0);
  } catch (error) {
    console.error('Support ticket seeding error:', error);
    process.exit(1);
  }
}

seedSupportTickets();