document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario || usuario.rol !== "admin") {
      window.location.href = "../index.html";
      return;
    }
  
    const solicitudes = JSON.parse(localStorage.getItem("solicitudesVacaciones")) || [];
    const tabla = document.getElementById("tablaAdminSolicitudes");
    const filtro = document.getElementById("filtroEstado");
  
    renderSolicitudes("todos");
  
    filtro.addEventListener("change", () => {
      renderSolicitudes(filtro.value);
    });
  
    function renderSolicitudes(estado) {
      tabla.innerHTML = "";
  
      const filtradas = estado === "todos" ? solicitudes : solicitudes.filter(s => s.estado === estado);
  
      if (filtradas.length === 0) {
        const fila = document.createElement("tr");
        const celda = document.createElement("td");
        celda.colSpan = 7;
        celda.textContent = "No hay solicitudes registradas.";
        celda.style.textAlign = "center";
        fila.appendChild(celda);
        tabla.appendChild(fila);
        return;
      }
  
      filtradas.forEach((solicitud, index) => {
        const fila = document.createElement("tr");
  
        fila.innerHTML = `
          <td>${solicitud.nombre || solicitud.usuario}</td>
          <td>${formatearFecha(solicitud.fechaInicio)}</td>
          <td>${formatearFecha(solicitud.fechaFin)}</td>
          <td>${formatearFecha(solicitud.fechaRegreso)}</td>
          <td>${solicitud.estado}</td>
          <td>${solicitud.comentario || "—"}</td>
          <td>
            ${solicitud.estado === "Pendiente"
              ? `
                <button onclick="aprobar(${solicitud.id})">✅</button>
                <button onclick="rechazar(${solicitud.id})">❌</button>
              `
              : "—"
            }
          </td>
        `;
  
        tabla.appendChild(fila);
      });
    }
  
    window.aprobar = (id) => {
      const comentario = prompt("¿Deseas agregar un comentario a esta aprobación?");
      actualizarEstado(id, "Aprobada", comentario || "");
    };
  
    window.rechazar = (id) => {
      const comentario = prompt("¿Por qué estás rechazando esta solicitud?");
      if (!comentario || comentario.trim().length < 5) {
        alert("El comentario es obligatorio y debe tener al menos 5 caracteres.");
        return;
      }
      actualizarEstado(id, "Rechazada", comentario);
    };
  
    function actualizarEstado(id, nuevoEstado, comentario) {
      const solicitudesActuales = JSON.parse(localStorage.getItem("solicitudesVacaciones")) || [];
      const index = solicitudesActuales.findIndex(s => s.id === id);
      if (index !== -1) {
        solicitudesActuales[index].estado = nuevoEstado;
        solicitudesActuales[index].comentario = comentario;
        solicitudesActuales[index].fechaRespuesta = new Date().toISOString();
  
        localStorage.setItem("solicitudesVacaciones", JSON.stringify(solicitudesActuales));
        alert(`Solicitud ${nuevoEstado.toLowerCase()} correctamente.`);
        renderSolicitudes(filtro.value);
      }
    }
  
    function formatearFecha(fecha) {
      if (!fecha) return "—";
      const f = new Date(fecha);
      return f.toLocaleDateString("es-CO");
    }
  
    window.cerrarSesion = () => {
      localStorage.removeItem("usuarioActivo");
      window.location.href = "../index.html";
    };
  });
  