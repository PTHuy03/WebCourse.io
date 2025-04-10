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
    origin: function (origin, callback) {
      const allowedOrigins = ["http://localhost:5500", "http://127.0.0.1:5500"];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
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
