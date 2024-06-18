import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

router.post('/api/register', async (req, res) => {
  const { nombre, apellido, ci, email, password } = req.body;
  
  try {
    const [existingUser] = await pool.query('SELECT * FROM cliente WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.json({ success: false, message: 'User already exists' });
    }

    const [result] = await pool.query('INSERT INTO cliente (nombre, apellido, ci, email, password) VALUES (?, ?, ?, ?, ?)', [nombre, apellido, ci, email, password]);
    if (result.affectedRows > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

export default router;
