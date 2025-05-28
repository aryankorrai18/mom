const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Auth header:", authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }

  const token = authHeader.split(' ')[1];
  console.log("Extracted token:", token);

  if (!token || token === 'null') {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_old);
    const user = await User.findById(decoded.id).select('name email role roletype');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const isAdmin = (req, res, next) => {
  const role = req.user.role?.toLowerCase();
  const roletype = req.user.roletype?.toLowerCase();

  if (role?.includes('admin') || roletype === 'admin') {
    return next();
  }

  return res.status(403).json({ message: 'Access denied. Admins only.' });
};

const validateAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] === 'null') {
      return res.status(401).json({ message: 'No token provided or invalid token' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_old);

    const admin = await User.findById(decoded.id).lean();
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (admin.roletype?.toLowerCase() !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    req.user = admin; // Optionally, attach full admin object
    next();
  } catch (err) {
    console.error('[validateAdmin] Error:', err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = {
  authenticate,
  isAdmin,
  validateAdmin
};
