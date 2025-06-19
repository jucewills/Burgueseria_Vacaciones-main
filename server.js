const express = require('express');
const pool = require('./js-admin/db'); // importa tu archivo de base de datos

const app = express();
const PORT = 3000;

app.use(express.json()); // para que el servidor pueda leer JSON

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/api/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT nombre FROM usuarios'); // Ajusta la tabla y campos según tu BD
    res.json(result.rows);
  } catch (err) {
    console.error('Error consultando la base de datos:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

