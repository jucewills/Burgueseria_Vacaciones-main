document.addEventListener("DOMContentLoaded", async () => {
  const admin = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (!admin || admin.rol !== "admin") {
    window.location.href = "../index.html";
    return;
  }

  const tabla = document.getElementById("tablaSolicitudesAdmin");
  const filtro = document.getElementById("filtroEstado");

  let solicitudes = [];

  async function cargarSolicitudesDesdeAPI() {
    try {
      const response = await fetch("https://vacation-tracker-juliocesarwil.replit.app/solicitudes");
      if (!response.ok) throw new Error("No se pudieron cargar las solicitudes desde el servidor.");
      solicitudes = await response.json();
      cargarSolicitudes();
    } catch (error) {
      console.error(error);
      tabla.innerHTML = `<tr><td colspan="7" style="text-align:center;">❌ Error al cargar datos del servidor.</td></tr>`;
    }
  }

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
        <td>${s.usuario}</td>
        <td>${formatearFecha(s.fecha_inicio)}</td>
        <td>—</td>
        <td>—</td>
        <td>${s.estado}</td>
        <td>${s.comentario || "—"}</td>
        <td>
          ${s.estado === "Pendiente" ? `
            <button onclick="aprobar(${s.id})">✅ Aprobar</button>
            <button onclick="rechazar(${s.id})">❌ Rechazar</button>
          ` : "—"}
        </td>
      `;

      tabla.appendChild(fila);
    });
  }

  filtro.addEventListener("change", cargarSolicitudes);

  function formatearFecha(fecha) {
    if (!fecha) return "—";
    const d = new Date(fecha);
    return d.toLocaleDateString("es-CO");
  }

  window.aprobar = async function (id) {
    const comentario = prompt("Agrega un comentario (opcional):") || "";
    await actualizarEstadoSolicitud(id, "Aprobada", comentario);
  };

  window.rechazar = async function (id) {
    const comentario = prompt("¿Por qué se rechaza la solicitud?") || "";
    await actualizarEstadoSolicitud(id, "Rechazada", comentario);
  };

  async function actualizarEstadoSolicitud(id, nuevoEstado, comentario) {
    try {
      const response = await fetch(`https://vacation-tracker-juliocesarwil.replit.app/solicitudes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado, comentario })
      });

      if (!response.ok) throw new Error('Error al actualizar la solicitud');
      alert(`✅ Solicitud ${nuevoEstado.toLowerCase()} correctamente.`);
      await cargarSolicitudesDesdeAPI(); // Recargar tabla con los cambios
    } catch (error) {
      console.error(error);
      alert('❌ No se pudo actualizar la solicitud.');
    }
  }

  // Inicializar al cargar la página
  await cargarSolicitudesDesdeAPI();
});
