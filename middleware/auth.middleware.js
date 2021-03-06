const jwt = require('jsonwebtoken');
const config = require('config');

function authMiddleware(req, res, next) {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Отсутствует авторизация!' });
    }

    const decodedToken = jwt.decode(token, config.get('jwtSecret'));
    if (decodedToken) {
      req.user = decodedToken;
      return next();
    }
    return res.status(401).json({ message: 'Отсутствует авторизация!' });
  } catch (e) {
    return res.status(401).json({ message: 'Отсутствует авторизация!' });
  }
}

module.exports = {
  authMiddleware,
};
