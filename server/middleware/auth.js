import jwt  from 'jsonwebtoken';
import pool from '../config/db.js';

export const protect = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided.' });
    }

    const token   = auth.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user to request — available as req.user in your controller
    const [[user]] = await pool.query(
      'SELECT id, username, email FROM users WHERE id = ?',
      [decoded.id]
    );

    if (!user) return res.status(401).json({ message: 'User not found.' });

    req.user = user;
    next();  // ← passes control to the controller

  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};