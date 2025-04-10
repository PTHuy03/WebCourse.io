const mongoose = require("mongoose");
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");

const uri =
  "mongodb+srv://vonghiaky12a7:Y3jmAqoTrWCDtfjY@test.jtia3.mongodb.net/?retryWrites=true&w=majority&appName=test";

async function seedAll() {
  try {
    await mongoose.connect(uri, {
      dbName: "WebKhoaHoc",
    });

    await Course.deleteMany({});
    await Lesson.deleteMany({});

    const courses = await Course.insertMany([
      {
        title: "Lập trình Python cơ bản",
        image: "public/img/PY.png",
        price: 0,
        description: "Khóa học Python cơ bản cho người mới bắt đầu.",
      },
      {
        title: "C++ cho người mới bắt đầu",
        image: "public/img/C+.png",
        price: 0,
        description: "Khóa học C++ cơ bản cho người mới bắt đầu.",
      },
      {
        title: "JavaScript cho người mới bắt đầu",
        image: "public/img/Js.png",
        price: 499000,
        description: "Khóa học JavaScript cơ bản cho người mới bắt đầu.",
      },
      {
        title: "Lập trình hướng đối tượng trong C++",
        image: "public/img/C+OOP.png",
        price: 339000,
        description: "Khóa học lập trình hướng đối tượng với C++.",
      },
      {
        title: "SQL cho người mới bắt đầu",
        image: "public/img/SQLCB.png",
        price: 0,
        description: "Khóa học SQL cơ bản cho người mới bắt đầu.",
      },
      {
        title: "Lập trình C++ nâng cao",
        image: "public/img/C+NC.png",
        price: 539000,
        description: "Khóa học C++ nâng cao.",
      },
      {
        title: "Lập trình Python nâng cao",
        image: "public/img/PYNC.png",
        price: 599000,
        description: "Khóa học Python nâng cao.",
      },
      {
        title: "SQL nâng cao",
        image: "public/img/SQLNC.png",
        price: 439000,
        description: "Khóa học SQL nâng cao.",
      },
    ]);

    const lessons = [];

    for (const course of courses) {
      let courseLessons = [];

      const sampleVideo =
        "https://www.youtube.com/embed/8BDIkM6a7nE?si=N0jbUzrTh0t2Nvax";

      if (course.title.includes("Python") && course.title.includes("cơ bản")) {
        courseLessons = [
          { title: "Giới thiệu Python", content: "Tổng quan về Python.", order: 1, chapter: 1, videoUrl: sampleVideo },
          { title: "Cài đặt môi trường", content: "Hướng dẫn cài đặt Python.", order: 2, chapter: 1, videoUrl: sampleVideo },
          { title: "Biến và kiểu dữ liệu", content: "Biến, kiểu số, chuỗi, boolean.", order: 3, chapter: 1, videoUrl: sampleVideo },
          { title: "Câu lệnh điều kiện", content: "if, else, elif.", order: 4, chapter: 1, videoUrl: sampleVideo },
          { title: "Vòng lặp", content: "for, while.", order: 5, chapter: 1, videoUrl: sampleVideo },
          { title: "Hàm", content: "Định nghĩa và gọi hàm.", order: 6, chapter: 1, videoUrl: sampleVideo },
          { title: "Lập trình hướng đối tượng", content: "Class, object.", order: 7, chapter: 1, videoUrl: sampleVideo },
          { title: "Danh sách (List)", content: "Cách sử dụng danh sách trong Python.", order: 1, chapter: 2, videoUrl: sampleVideo },
          { title: "Tuple và Set", content: "Giới thiệu tuple và set.", order: 2, chapter: 2, videoUrl: sampleVideo },
          { title: "Từ điển (Dictionary)", content: "Cách làm việc với dictionary.", order: 3, chapter: 2, videoUrl: sampleVideo },
          { title: "Xử lý ngoại lệ", content: "Try, except, finally.", order: 4, chapter: 2, videoUrl: sampleVideo },
          { title: "Làm việc với file", content: "Đọc và ghi file trong Python.", order: 5, chapter: 2, videoUrl: sampleVideo },
          { title: "Module và Package", content: "Sử dụng module và package.", order: 6, chapter: 2, videoUrl: sampleVideo }
        ];
      } else if (course.title.includes("Python") && course.title.includes("nâng cao")) {
        courseLessons = [
          { title: "Decorator trong Python", content: "Trang trí hàm.", order: 1, chapter: 1, videoUrl: sampleVideo },
          { title: "Generator", content: "Sinh dữ liệu lười.", order: 2, chapter: 1, videoUrl: sampleVideo },
          { title: "Xử lý ngoại lệ nâng cao", content: "Try, except, raise.", order: 3, chapter: 2, videoUrl: sampleVideo },
          { title: "Lập trình bất đồng bộ", content: "Async, await.", order: 4, chapter: 3, videoUrl: sampleVideo },
          { title: "Quản lý package", content: "pip, virtualenv.", order: 5, chapter: 3, videoUrl: sampleVideo },
          { title: "Lập trình mạng", content: "Socket, HTTP.", order: 6, chapter: 4, videoUrl: sampleVideo },
          { title: "Lập trình đa luồng", content: "Threading, multiprocessing.", order: 7, chapter: 4, videoUrl: sampleVideo }
        ];
      } else if (course.title.includes("C++") && course.title.includes("nâng cao")) {
        courseLessons = [
          { title: "Template trong C++", content: "Lập trình tổng quát.", order: 1, chapter: 1, videoUrl: sampleVideo },
          { title: "STL nâng cao", content: "Vector, Map, Set.", order: 2, chapter: 1, videoUrl: sampleVideo },
          { title: "Quản lý bộ nhớ", content: "Smart pointer.", order: 3, chapter: 2, videoUrl: sampleVideo },
          { title: "Lập trình đa luồng", content: "Thread, mutex.", order: 4, chapter: 3, videoUrl: sampleVideo },
          { title: "Xử lý ngoại lệ", content: "Try, catch.", order: 5, chapter: 3, videoUrl: sampleVideo },
          { title: "Design Pattern", content: "Singleton, Factory.", order: 6, chapter: 4, videoUrl: sampleVideo }
        ];
      } else if (course.title.includes("C++")) {
        courseLessons = [
          { title: "Giới thiệu C++", content: "Tổng quan về C++.", order: 1, chapter: 1, videoUrl: sampleVideo },
          { title: "Cài đặt môi trường", content: "Hướng dẫn cài đặt C++.", order: 2, chapter: 1, videoUrl: sampleVideo },
          { title: "Biến và kiểu dữ liệu", content: "int, float, char, string.", order: 3, chapter: 2, videoUrl: sampleVideo },
          { title: "Câu lệnh điều kiện", content: "if, else, switch.", order: 4, chapter: 3, videoUrl: sampleVideo },
          { title: "Vòng lặp", content: "for, while, do-while.", order: 5, chapter: 3, videoUrl: sampleVideo },
          { title: "Hàm", content: "Định nghĩa và gọi hàm.", order: 6, chapter: 4, videoUrl: sampleVideo },
          { title: "Con trỏ", content: "Pointer trong C++.", order: 7, chapter: 4, videoUrl: sampleVideo },
          { title: "Lập trình hướng đối tượng", content: "Class, object, kế thừa.", order: 8, chapter: 5, videoUrl: sampleVideo }
        ];
      } else if (course.title.includes("JavaScript")) {
        courseLessons = [
          { title: "Giới thiệu JavaScript", content: "Tổng quan về JavaScript.", order: 1, chapter: 1, videoUrl: sampleVideo },
          { title: "Biến và kiểu dữ liệu", content: "var, let, const, kiểu dữ liệu.", order: 2, chapter: 1, videoUrl: sampleVideo },
          { title: "Toán tử", content: "Toán tử số học, logic.", order: 3, chapter: 2, videoUrl: sampleVideo },
          { title: "Câu lệnh điều kiện", content: "if, else, switch.", order: 4, chapter: 2, videoUrl: sampleVideo },
          { title: "Vòng lặp", content: "for, while, do-while.", order: 5, chapter: 3, videoUrl: sampleVideo },
          { title: "Hàm", content: "Function declaration, expression, arrow.", order: 6, chapter: 3, videoUrl: sampleVideo },
          { title: "DOM", content: "Tương tác với HTML.", order: 7, chapter: 4, videoUrl: sampleVideo },
          { title: "Event", content: "Xử lý sự kiện.", order: 8, chapter: 4, videoUrl: sampleVideo }
        ];
      } else if (course.title.includes("SQL") && course.title.includes("nâng cao")) {
        courseLessons = [
          { title: "Stored Procedure", content: "Thủ tục lưu trữ.", order: 1, chapter: 1, videoUrl: sampleVideo },
          { title: "Trigger", content: "Kích hoạt tự động.", order: 2, chapter: 1, videoUrl: sampleVideo },
          { title: "Transaction", content: "Giao dịch.", order: 3, chapter: 2, videoUrl: sampleVideo },
          { title: "Index", content: "Chỉ mục.", order: 4, chapter: 3, videoUrl: sampleVideo },
          { title: "Tối ưu truy vấn", content: "Query optimization.", order: 5, chapter: 3, videoUrl: sampleVideo }
        ];
      } else if (course.title.includes("SQL")) {
        courseLessons = [
          { title: "Giới thiệu SQL", content: "Tổng quan về SQL.", order: 1, chapter: 1, videoUrl: sampleVideo },
          { title: "Cơ sở dữ liệu quan hệ", content: "Khái niệm cơ bản.", order: 2, chapter: 1, videoUrl: sampleVideo },
          { title: "Câu lệnh SELECT", content: "Truy vấn dữ liệu.", order: 3, chapter: 2, videoUrl: sampleVideo },
          { title: "Câu lệnh INSERT", content: "Thêm dữ liệu.", order: 4, chapter: 2, videoUrl: sampleVideo },
          { title: "Câu lệnh UPDATE", content: "Cập nhật dữ liệu.", order: 5, chapter: 3, videoUrl: sampleVideo },
          { title: "Câu lệnh DELETE", content: "Xóa dữ liệu.", order: 6, chapter: 3, videoUrl: sampleVideo },
          { title: "JOIN", content: "Kết hợp bảng.", order: 7, chapter: 4, videoUrl: sampleVideo },
          { title: "GROUP BY & HAVING", content: "Nhóm dữ liệu.", order: 8, chapter: 4, videoUrl: sampleVideo }
        ];
      }

      const insertedLessons = await Lesson.insertMany(
        courseLessons.map((lesson) => ({
          ...lesson,
          course: course._id,
        }))
      );

      course.lessons = insertedLessons.map((l) => l._id);
      await course.save();
    }

    console.log("Master seeding completed with video URLs.");
    process.exit(0);
  } catch (error) {
    console.error("Master seeding error:", error);
    process.exit(1);
  }
}

seedAll();
