const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const usersRouter = require("./routes/users");
const coursesRouter = require("./routes/courses");
const lessonsRouter = require("./routes/lessons");
const supportRouter = require("./routes/support");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(
  cors({
    origin: "*", // Cho phép tất cả domain
    credentials: true, // Nếu dùng cookie, cần cấu hình thêm phía FE
  })
);
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/lessons", lessonsRouter);
app.use("/api/support", supportRouter);

// Simple route
app.get("/", (req, res) => {
  res.send("Backend server is running and connected to MongoDB!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
