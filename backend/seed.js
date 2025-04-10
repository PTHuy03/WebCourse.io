const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
const Lesson = require('./models/Lesson');
const SupportTicket = require('./models/SupportTicket');

const uri = 'mongodb+srv://vonghiaky12a7:Y3jmAqoTrWCDtfjY@test.jtia3.mongodb.net/?retryWrites=true&w=majority&appName=test';

async function seedDatabase() {
  try {
    await mongoose.connect(uri, {
      dbName: 'WebKhoaHoc',
    });

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Lesson.deleteMany({});
    await SupportTicket.deleteMany({});

    // Seed users
    const users = await User.insertMany([
      {
        username: 'student1',
        email: 'student1@example.com',
        password: 'hashedpassword1',
        role: 'student'
      },
      {
        username: 'teacher1',
        email: 'teacher1@example.com',
        password: 'hashedpassword2',
        role: 'teacher'
      },
      {
        username: 'admin1',
        email: 'admin1@example.com',
        password: 'hashedpassword3',
        role: 'admin'
      }
    ]);

    // Seed courses
    const courses = await Course.insertMany([
      {
        title: 'Lập trình Python cơ bản',
        image: 'public/img/PY.png',
        price: 0,
        description: 'Khóa học Python cơ bản cho người mới bắt đầu.'
      },
      {
        title: 'C++ cho người mới bắt đầu',
        image: 'public/img/C+.png',
        price: 0,
        description: 'Khóa học C++ cơ bản cho người mới bắt đầu.'
      }
    ]);

    // Seed lessons linked to courses
    const lessons = await Lesson.insertMany([
      {
        title: 'Giới thiệu Python',
        content: 'Nội dung bài học về giới thiệu Python.',
        videoUrl: '',
        order: 1,
        course: courses[0]._id
      },
      {
        title: 'Biến và kiểu dữ liệu trong Python',
        content: 'Nội dung bài học về biến và kiểu dữ liệu.',
        videoUrl: '',
        order: 2,
        course: courses[0]._id
      },
      {
        title: 'Giới thiệu C++',
        content: 'Nội dung bài học về giới thiệu C++.',
        videoUrl: '',
        order: 1,
        course: courses[1]._id
      }
    ]);

    // Update courses with lesson references
    await Promise.all(courses.map(async (course) => {
      const courseLessons = lessons.filter(lesson => lesson.course.toString() === course._id.toString());
      course.lessons = courseLessons.map(lesson => lesson._id);
      await course.save();
    }));

    // Seed support tickets linked to users
    await SupportTicket.insertMany([
      {
        user: users[0]._id,
        email: users[0].email,
        subject: 'Vấn đề đăng nhập',
        message: 'Tôi không thể đăng nhập vào tài khoản.',
        status: 'open'
      },
      {
        user: users[1]._id,
        email: users[1].email,
        subject: 'Câu hỏi về bài học',
        message: 'Bài học số 2 có video không?',
        status: 'open'
      }
    ]);

    console.log('Database seeded with users, courses, lessons, and support tickets successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();