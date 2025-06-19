document.addEventListener("DOMContentLoaded", async () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (!usuario || usuario.rol !== "empleado") {
    window.location.href = "../index.html";
    return;
  }

  const tabla = document.getElementById("tablaSolicitudes");

  try {
    const response = await fetch("https://vacation-tracker-juliocesarwil.replit.app/solicitudes");
    if (!response.ok) throw new Error("Error al obtener solicitudes");

    const todasLasSolicitudes = await response.json();
    const misSolicitudes = todasLasSolicitudes.filter(s => s.usuario === usuario.usuario);

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
        <td>${formatearFecha(solicitud.fecha_inicio)}</td>
        <td>—</td>
        <td>—</td>
        <td>${solicitud.estado}</td>
        <td>—</td>
        <td>—</td>
      `;

      tabla.appendChild(fila);
    });

  } catch (error) {
    console.error("Error:", error);
    const fila = document.createElement("tr");
    const celda = document.createElement("td");
    celda.colSpan = 6;
    celda.textContent = "❌ No se pudieron cargar las solicitudes.";
    celda.style.textAlign = "center";
    fila.appendChild(celda);
    tabla.appendChild(fila);
  }

  function formatearFecha(fecha) {
    if (!fecha) return "—";
    const date = new Date(fecha);
    return date.toLocaleDateString("es-CO");
  }
});
