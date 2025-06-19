const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'sistema_de_vacasiones'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a MySQL');
});

// Ruta para registrar usuario
app.post('/registrar', async (req, res) => {
  try {
    const {
      nombre_completo, documento, correo, cargo,
      salario, fecha_ingreso, tipo_contrato,
      fecha_finalizacion, rol, contrasena
    } = req.body;

    const contrasenaHasheada = await bcrypt.hash(contrasena, 10);

    const sql = `
      INSERT INTO usuarios (
        nombre_completo, documento, correo, cargo, salario,
        fecha_ingreso, tipo_contrato, fecha_finalizacion,
        rol, contrasena
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
      nombre_completo, documento, correo, cargo, salario,
      fecha_ingreso, tipo_contrato, fecha_finalizacion,
      rol, contrasenaHasheada
    ], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error al registrar usuario.');
      }
      res.send('Usuario registrado exitosamente.');
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor.');
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
