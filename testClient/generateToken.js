// generateToken.js
const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key';
const payload = {
  userId: 'user123',
  username: 'exampleUser',
  // You can add more fields here
};

const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
console.log('Generated Token:', token);
