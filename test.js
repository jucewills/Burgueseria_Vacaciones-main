<<<<<<< HEAD
// test.js
const db = require('./js-admin/db.js'); // Ruta según la imagen que mostraste

db.query('SELECT 1 + 1 AS resultado', (err, results) => {
  if (err) {
    console.error('❌ Error al hacer la consulta:', err.message);
    return;
  }
  console.log('✅ Resultado de la prueba:', results[0].resultado);
});

=======
require('dotenv').config();
console.log(process.env.DB_USER);
>>>>>>> d56540641b64167587ec780978110c7f42ee18ab
