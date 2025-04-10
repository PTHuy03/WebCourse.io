const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const usersRouter = require("./routes/users");
const coursesRouter = require("./routes/courses");
const lessonsRouter = require("./routes/lessons");
const supportRouter = require("./routes/support");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

const allowedOrigins = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "https://pthuy03.github.io",
];

// ✅ Middleware này để xử lý CORS thủ công cho chắc chắn
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Xử lý preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Nếu bạn vẫn muốn dùng cors package:
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/lessons", lessonsRouter);
app.use("/api/support", supportRouter);

app.get("/", (req, res) => {
  res.send("Backend server is running and connected to MongoDB!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
