import pool from '../config/db.js';
import { buildInventory } from '../game/inventory.js';

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

    // Create inventory
    createInventory(pool, req.user.id);


    const [[player]] = await pool.query(
      'SELECT * FROM players WHERE user_id = ?', [req.user.id]
    );

    res.status(201).json({ player });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

async function createInventory(conn, userId) {

  await conn.query(
    `INSERT INTO inventory (user_id, case_id, horse_id) VALUES (?, 26, 27)`,
    [userId]
  );

  await conn.query(
    `INSERT INTO inventory_items (user_id, item_id, quantity, level) VALUES
    (?, 26, 1, 1),
    (?, 27, 1, 1),
    (?, 1,  1, 1)`,
    [userId, userId, userId]
  );
  
  // Get the Old Pistol instance id and set it as equipped
  const [[pistol]] = await conn.query(
    `SELECT id FROM inventory_items WHERE user_id = ? AND item_id = 1`,
    [userId]
  );

  await conn.query(
    `UPDATE inventory SET weapon_instance_id = ? WHERE user_id = ?`,
    [pistol.id, userId]
  );
  
}


export const getMe = async (req, res) => {
  const [[player]] = await pool.query(
    'SELECT * FROM players WHERE user_id = ?', [req.user.id]
  );
  if (!player) return res.status(404).json({ message: 'No player found.' });

  // Get inventory
  const [[inv]] = await pool.query(
    'SELECT * FROM inventory WHERE user_id = ?', [req.user.id]
  )

  const [rows] = await pool.query(
    'SELECT id, item_id, quantity, level FROM inventory_items WHERE user_id = ?', [req.user.id]
  );

  const inventory = buildInventory(inv, rows)

  res.json({ player: {...player, inventory} });
};