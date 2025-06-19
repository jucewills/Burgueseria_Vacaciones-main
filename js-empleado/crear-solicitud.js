document.addEventListener('DOMContentLoaded', () => {
    const fechaInicioInput = document.getElementById('fechaInicio');
    const fechaFinSpan = document.getElementById('fechaFin');
    const fechaRegresoSpan = document.getElementById('fechaRegreso');
    const formSolicitud = document.getElementById('formSolicitud');
    const mensajeError = document.getElementById('mensajeError');
  
    fechaInicioInput.addEventListener('change', () => {
      const fechaInicio = new Date(fechaInicioInput.value);
  
      if (!isNaN(fechaInicio)) {
        const diasHabiles = 5; // Duración de las vacaciones en días hábiles
  
        const fechaFin = sumarDiasHabiles(fechaInicio, diasHabiles - 1);
        const fechaRegreso = siguienteDiaHabil(fechaFin);
  
        fechaFinSpan.textContent = formatearFecha(fechaFin);
        fechaRegresoSpan.textContent = formatearFecha(fechaRegreso);
      } else {
        fechaFinSpan.textContent = '';
        fechaRegresoSpan.textContent = '';
      }
    });
  
    formSolicitud.addEventListener('submit', (e) => {
      e.preventDefault();

      const fechaInicio = fechaInicioInput.value;
      const fechaFin = fechaFinSpan.textContent;
      const fechaRegreso = fechaRegresoSpan.textContent;

      if (!fechaInicio || !fechaFin || !fechaRegreso) {
        mensajeError.textContent = 'Por favor, selecciona una fecha válida de inicio.';
        return;
      }
    
      const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));
    
      // Construimos el objeto completo
      const solicitud = {
        usuario: usuario.usuario,
        nombre: usuario.nombre,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        fecha_regreso: fechaRegreso,
        estado: 'Pendiente'
      };
    
      fetch('https://vacation-tracker-juliocesarwil.replit.app/solicitudes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(solicitud)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('No se pudo guardar la solicitud.');
          }
          return response.json();
        })
        .then(data => {
          alert('✅ Solicitud enviada exitosamente al servidor.');
          formSolicitud.reset();
          fechaFinSpan.textContent = '';
          fechaRegresoSpan.textContent = '';
          mensajeError.textContent = '';
        })
        .catch(error => {
          console.error(error);
          mensajeError.textContent = '❌ Ocurrió un error al enviar la solicitud.';
        });
    });
  
    function sumarDiasHabiles(fecha, dias) {
      let resultado = new Date(fecha);
      let sumados = 0;
  
      while (sumados < dias) {
        resultado.setDate(resultado.getDate() + 1);
        const dia = resultado.getDay();
        if (dia !== 0 && dia !== 6) {
          sumados++;
        }
      }
  
      return resultado;
    }
  
    function siguienteDiaHabil(fecha) {
      let resultado = new Date(fecha);
      do {
        resultado.setDate(resultado.getDate() + 1);
      } while (resultado.getDay() === 0 || resultado.getDay() === 6);
      return resultado;
    }
  
    function formatearFecha(fecha) {
      return fecha.toISOString().split('T')[0];
    }
  });
  
