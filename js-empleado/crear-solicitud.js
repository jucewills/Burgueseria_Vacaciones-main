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
  
      // Aquí puedes guardar los datos en localStorage o enviarlos a un servidor
      const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));

      const solicitud = {
        id: Date.now(),
        usuario: usuario.usuario,
        nombre: usuario.nombre,
        fechaInicio,
        fechaFin,
        fechaRegreso,
        estado: 'Pendiente',
        enviada: new Date().toISOString()
      };
      
  
      // Guardar en localStorage (simulación)
      const solicitudes = JSON.parse(localStorage.getItem('solicitudesVacaciones')) || [];
      solicitudes.push(solicitud);
      localStorage.setItem('solicitudesVacaciones', JSON.stringify(solicitudes));
  
      // Mostrar mensaje de éxito o redireccionar
      alert('✅ Solicitud enviada exitosamente.');
      formSolicitud.reset();
      fechaFinSpan.textContent = '';
      fechaRegresoSpan.textContent = '';
      mensajeError.textContent = '';
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
  