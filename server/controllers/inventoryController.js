import pool from '../config/db.js';
import { getItemData } from '../utils/item.js';
import { buildInventory }  from '../game/inventory.js';

export const buyItem = async (req, res) => {
  const { item_id, quantity = 1 } = req.body;
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // Validate item exists
    const item = getItemData(item_id);
    if (!item) return res.status(404).json({ message: 'Item not found.' });

    // Check player has enough gold
    const [[player]] = await conn.query(
      `SELECT gold FROM players WHERE user_id = ?`, [req.user.id]
    );
    const totalCost = item.value * quantity;
    if (player.gold < totalCost)
      return res.status(400).json({ message: 'Not enough gold.' });

    // Check inventory space
    const [[inv]] = await conn.query(
      `SELECT * FROM inventory WHERE user_id = ?`, [req.user.id]
    );
    const [rows] = await conn.query(
      `SELECT * FROM inventory_items WHERE user_id = ?`, [req.user.id]
    );
    const { freeSlots } = buildInventory(inv, rows);
    if (freeSlots < quantity)
      return res.status(400).json({ message: 'Not enough inventory space.' });

    // Check stack limit for existing item
    const [existing] = await conn.query(
      `SELECT id, quantity FROM inventory_items WHERE user_id = ? AND item_id = ?`,
      [req.user.id, item_id]
    );
    if (existing.length && existing[0].quantity + quantity > item.max_stack)
      return res.status(400).json({ message: `Stack limit is ${item.max_stack}.` });

    // Deduct gold
    await conn.query(
      `UPDATE players SET gold = gold - ? WHERE user_id = ?`,
      [totalCost, req.user.id]
    );

    // Add item to inventory
    if (existing.length) {
      await conn.query(
        `UPDATE inventory_items SET quantity = quantity + ? WHERE id = ?`,
        [quantity, existing[0].id]
      );
    } else {
      await conn.query(
        `INSERT INTO inventory_items (user_id, item_id, quantity, level) VALUES (?, ?, ?, 1)`,
        [req.user.id, item_id, quantity]
      );
    }

    await conn.commit();
    res.json({ message: 'Item purchased.', cost: totalCost });

  } catch (err) {
        await conn.rollback();
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
  } finally {
        conn.release();
  }
};


export const equipItem = async (req, res) => {
  const { item_id } = req.body;
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // Verify the item exists and belongs to this user
    const [rows] = await conn.query(
      `SELECT id FROM inventory_items WHERE id = ? AND user_id = ?`,
      [item_id, req.user.id]
    );

    console.log(`USER ID: ${req.user.id}`)
    console.log(`ITEM ID: ${item_id}`)

    if (rows.length === 0) {
      await conn.rollback();
      return res.status(404).json({ message: 'Item not found.' });
    }

    // Equip it in the correct table
    await conn.query(
      `UPDATE inventory SET weapon_instance_id = ? WHERE user_id = ?`,
      [item_id, req.user.id]
    );

    await conn.commit();
    res.json({ message: 'Weapon equipped.' });

  } catch (err) {
      await conn.rollback();
      console.error(err);
      res.status(500).json({ message: 'Server error.' });
  } finally {
      conn.release();
  }
};