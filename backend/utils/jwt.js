const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const getJwtToken = (id) => {
  const token = jwt.sign({ payload: id }, JWT_SECRET, { expiresIn: '7d' });
  return token;
};

module.exports = getJwtToken;
