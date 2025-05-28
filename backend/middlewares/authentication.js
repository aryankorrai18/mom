const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Auth header:", authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  console.log("Extracted token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    const user = await User.findById(decoded.id).select('name email role roletype'); // add more fields as needed
    console.log("User fetched in middleware:", user);


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

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await User.findById(decoded._id).lean();
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (admin.roletype !== 'Admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    req.user = decoded._id;
    next();
  } catch (err) {
    console.error('[validateAdmin] Error:', err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { authenticate, isAdmin,validateAdmin };
