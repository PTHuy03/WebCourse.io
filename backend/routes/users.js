const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

const SECRET_KEY = "your_secret_key"; // Replace with env variable in production
const User = require("../models/User");

// Register new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get current user info (protected)
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user info (protected)
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const {
      username,
      fullName,
      email,
      password,
      avatar,
      gender,
      country,
      language,
      timezone,
    } = req.body;

    const updateData = {};

    if (username) updateData.username = username;
    if (fullName) updateData.fullName = fullName;
    if (email) updateData.email = email;
    if (avatar) updateData.avatar = avatar;
    if (gender) updateData.gender = gender;
    if (country) updateData.country = country;
    if (language) updateData.language = language;
    if (timezone) updateData.timezone = timezone;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(req.user.userId, updateData, {
      new: true,
    }).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User updated successfully", user });
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

module.exports = router;
