
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key'; // Replace with env variable in production


function authMiddleware(req, res, next) {
  let token;


  console.log("Headers: ", req.headers);

  // 1️⃣ Ưu tiên lấy token từ Cookie (nếu có)
  if (req.headers.cookie) {
    const cookies = req.headers.cookie.split(";").map((c) => c.trim());
    for (const cookie of cookies) {
      if (cookie.startsWith("authToken=")) {
        token = cookie.replace("authToken=", "");
        break;
      }
    }
  }


  // 2️⃣ Nếu không có cookie, thử lấy từ Authorization header
  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 3️⃣ Nếu vẫn không có token
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });

  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {

    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authMiddleware;

