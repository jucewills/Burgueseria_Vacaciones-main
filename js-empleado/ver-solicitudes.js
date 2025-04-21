document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  
    if (!usuario || usuario.rol !== "empleado") {
      window.location.href = "../index.html";
      return;
    }
  
    const tabla = document.getElementById("tablaSolicitudes");
    let solicitudes = JSON.parse(localStorage.getItem("solicitudesVacaciones")) || [];
  
    const misSolicitudes = solicitudes.filter(s => s.usuario === usuario.usuario);
  
    if (misSolicitudes.length === 0) {
      const fila = document.createElement("tr");
      const celda = document.createElement("td");
      celda.colSpan = 6;
      celda.textContent = "No tienes solicitudes registradas.";
      celda.style.textAlign = "center";
      fila.appendChild(celda);
      tabla.appendChild(fila);
      return;
    }
  
    misSolicitudes.forEach(solicitud => {
      const fila = document.createElement("tr");
  
      fila.innerHTML = `
        <td>${formatearFecha(solicitud.fechaInicio)}</td>
        <td>${formatearFecha(solicitud.fechaFin)}</td>
        <td>${formatearFecha(solicitud.fechaRegreso)}</td>
        <td>${solicitud.estado}</td>
        <td>${formatearFecha(solicitud.enviada)}</td>
        <td>${solicitud.estado === "Pendiente" ? `<button onclick="cancelarSolicitud(${solicitud.id})">❌ Cancelar</button>` : "—"}</td>
      `;
  
      tabla.appendChild(fila);
    });
  
    function formatearFecha(fecha) {
      if (!fecha) return "—";
      const date = new Date(fecha);
      return date.toLocaleDateString("es-CO");
    }
  
    window.cancelarSolicitud = function (id) {
      if (!confirm("¿Estás seguro de cancelar esta solicitud?")) return;
  
      const index = solicitudes.findIndex(s => s.id === id && s.usuario === usuario.usuario);
      if (index !== -1) {
        solicitudes[index].estado = "Cancelada";
        localStorage.setItem("solicitudesVacaciones", JSON.stringify(solicitudes));
        alert("🗑️ Solicitud cancelada correctamente.");
        location.reload(); // Recarga para actualizar tabla
      }
    };
  });
  