require('dotenv').config();
const express = require('express');
const { initializeDatabase, pool } = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/users', async (_req, res) => {
  const [rows] = await pool.query('SELECT id, name, email, created_at FROM users');
  res.json(rows);
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'name i email są wymagane' });
  }

  const [result] = await pool.query(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email]
  );

  return res.status(201).json({ id: result.insertId, name, email });
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'name i email są wymagane' });
  }

  const [result] = await pool.query(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [name, email, id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'Użytkownik nie istnieje' });
  }

  return res.json({ id: Number(id), name, email });
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'Użytkownik nie istnieje' });
  }

  return res.status(204).send();
});

app.use((error, _req, res, _next) => {
  console.error(error);
  return res.status(500).json({ message: 'Błąd serwera' });
});

initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Serwer działa na porcie ${port}`);
    });
  })
  .catch((error) => {
    console.error('Nie udało się zainicjalizować bazy danych:', error.message);
    process.exit(1);
  });
