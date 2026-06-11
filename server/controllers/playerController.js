import pool from '../config/db.js';

export const createPlayer = async (req, res) => {
  try {
    const { name, avatar, type } = req.body;
  

    if (!name || !avatar)
      return res.status(400).json({ message: 'Name and avatar are required.' });

    // prevent duplicate
    const [existing] = await pool.query(
      'SELECT user_id FROM players WHERE user_id = ?', [req.user.id]
    );
    if (existing.length)
      return res.status(409).json({ message: 'Player already exists.' });

    await pool.query(
      'INSERT INTO players (user_id, name, avatar_id, avatar_type) VALUES (?, ?, ?, ?)',
      [req.user.id, name, avatar, type]
    );

    const [[player]] = await pool.query(
      'SELECT * FROM players WHERE user_id = ?', [req.user.id]
    );

    res.status(201).json({ player });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMe = async (req, res) => {
  const [[player]] = await pool.query(
    'SELECT * FROM players WHERE user_id = ?', [req.user.id]
  );
  if (!player) return res.status(404).json({ message: 'No player found.' });
  res.json({ player });
};