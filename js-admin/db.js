// db.js
const mysql = require('mysql2');
require('dotenv').config();

// Mostrar las variables de entorno para depurar
console.log('Variables de entorno:');
console.log('Usuario:', process.env.DB_USER);
console.log('Contraseña:', process.env.DB_PASSWORD);
console.log('Host:', process.env.DB_HOST);
console.log('Base de datos:', process.env.DB_NAME);

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((error) => {
  if (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message);
    return;
  }
  console.log('✅ Conexión exitosa a la base de datos MySQL');
});

module.exports = connection;
