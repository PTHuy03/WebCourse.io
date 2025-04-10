const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key'; // Replace with env variable in production

function authMiddleware(req, res, next) {
  let token;

  // Extract token from cookie
  if (req.headers.cookie) {
    const cookies = req.headers.cookie.split(';').map(c => c.trim());
    for (const cookie of cookies) {
      if (cookie.startsWith('authToken=')) {
        token = cookie.replace('authToken=', '');
        break;
      }
    }
  }

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = authMiddleware;