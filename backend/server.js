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

app.use(
  cors({
    origin: function (origin, callback) {
      callback(null, origin || "*"); // Cho phép tất cả origin
    },
    credentials: true, // Hỗ trợ cookie, auth header,...
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
