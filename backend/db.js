const mongoose = require('mongoose');

const uri = 'mongodb+srv://vonghiaky12a7:Y3jmAqoTrWCDtfjY@test.jtia3.mongodb.net/?retryWrites=true&w=majority&appName=test';

async function connectDB() {
  try {
    await mongoose.connect(uri, {
      dbName: 'WebKhoaHoc',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB database: WebKhoaHoc');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

module.exports = connectDB;