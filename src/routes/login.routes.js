import express from 'express';
import { pool } from './db.js';

const app = express();
app.use(express.json());

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const [result] = await pool.query('SELECT * FROM cliente WHERE email = ? AND password = ?', [email, password]);

  if (result.length > 0) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
