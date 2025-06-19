// test.js
const db = require('./js-admin/db.js'); // Ruta según la imagen que mostraste

db.query('SELECT 1 + 1 AS resultado', (err, results) => {
  if (err) {
    console.error('❌ Error al hacer la consulta:', err.message);
    return;
  }
  console.log('✅ Resultado de la prueba:', results[0].resultado);
});

