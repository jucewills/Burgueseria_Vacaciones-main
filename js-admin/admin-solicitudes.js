document.addEventListener("DOMContentLoaded", () => {
    const admin = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!admin || admin.rol !== "admin") {
      window.location.href = "../index.html";
      return;
    }
  
    const tabla = document.getElementById("tablaSolicitudesAdmin");
    const filtro = document.getElementById("filtroEstado");
  
    let solicitudes = JSON.parse(localStorage.getItem("solicitudesVacaciones")) || [];
  
    function cargarSolicitudes() {
      tabla.innerHTML = "";
  
      const estadoSeleccionado = filtro.value;
      const solicitudesFiltradas = estadoSeleccionado === "Todos"
        ? solicitudes
        : solicitudes.filter(s => s.estado === estadoSeleccionado);
  
      if (solicitudesFiltradas.length === 0) {
        tabla.innerHTML = `<tr><td colspan="7" style="text-align:center;">No hay solicitudes para mostrar.</td></tr>`;
        return;
      }
  
      solicitudesFiltradas.forEach(s => {
        const fila = document.createElement("tr");
  
        fila.innerHTML = `
          <td>${s.nombre}</td>
          <td>${formatearFecha(s.fechaInicio)}</td>
          <td>${formatearFecha(s.fechaFin)}</td>
          <td>${formatearFecha(s.fechaRegreso)}</td>
          <td>${s.estado}</td>
          <td>${s.comentario || "—"}</td>
          <td>
            ${s.estado === "Pendiente" ? `
              <button onclick="aprobar('${s.id}')">✅ Aprobar</button>
              <button onclick="rechazar('${s.id}')">❌ Rechazar</button>
            ` : "—"}
          </td>
        `;
  
        tabla.appendChild(fila);
      });
    }
  
    filtro.addEventListener("change", cargarSolicitudes);
  
    window.aprobar = function (id) {
      const index = solicitudes.findIndex(s => s.id == id);
      if (index !== -1) {
        const comentario = prompt("Agrega un comentario (opcional):");
        solicitudes[index].estado = "Aprobada";
        solicitudes[index].comentario = comentario || "";
        guardarYRecargar();
      }
    };
  
    window.rechazar = function (id) {
      const index = solicitudes.findIndex(s => s.id == id);
      if (index !== -1) {
        const comentario = prompt("¿Por qué se rechaza la solicitud?");
        solicitudes[index].estado = "Rechazada";
        solicitudes[index].comentario = comentario || "";
        guardarYRecargar();
      }
    };
  
    function guardarYRecargar() {
      localStorage.setItem("solicitudesVacaciones", JSON.stringify(solicitudes));
      cargarSolicitudes();
    }
  
    function formatearFecha(fecha) {
      const d = new Date(fecha);
      return d.toLocaleDateString("es-CO");
    }
  
    cargarSolicitudes();
  });
  