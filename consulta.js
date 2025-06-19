console.log('🟡 Ejecutando consulta...');

const conexion = require('./js-admin/db'); // Asegúrate de que la ruta sea correcta

conexion.query('SELECT * FROM usuarios', (error, resultados) => {
  if (error) {
    console.error('❌ Error al hacer la consulta:', error);
    return;
  }
  console.log('✅ Resultados de la consulta:');
  console.table(resultados); // Muestra los datos en forma de tabla en la consola
});
