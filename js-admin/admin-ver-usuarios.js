document.addEventListener("DOMContentLoaded", () => {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (!usuarioActivo || usuarioActivo.rol !== "admin") {
    window.location.href = "../index.html";
    return;
  }

  const tabla = document.getElementById("tablaUsuarios");

  async function cargarUsuarios() {
    try {
      const response = await fetch("https://vacation-tracker-juliocesarwil.replit.app/api/users");
      if (!response.ok) throw new Error("Error al obtener los usuarios");

      const usuarios = await response.json();
      renderTabla(usuarios);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      tabla.innerHTML = `<tr><td colspan="5">Error al cargar usuarios</td></tr>`;
    }
  }

  function renderTabla(usuarios) {
    tabla.innerHTML = "";

    usuarios.forEach((user, index) => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${user.username}</td>
        <td>${user.name}</td>
        <td>${user.role}</td>
        <td>${user.active ? "Activo" : "Inactivo"}</td>
        <td>
          <button onclick="toggleEstado(${user.id}, ${user.active})">
            ${user.active ? "Desactivar" : "Activar"}
          </button>
        </td>
      `;

      tabla.appendChild(fila);
    });
  }

  // Por ahora solo muestra un mensaje: tu backend aún no permite cambiar el estado.
  window.toggleEstado = async (id, estadoActual) => {
    alert(`Aquí se enviaría una solicitud para cambiar el estado del usuario con ID ${id} a ${!estadoActual ? "Activo" : "Inactivo"}`);
    // ⚠️ Tu backend aún no tiene un endpoint PATCH /api/users/:id para cambiar el estado.
    // Te puedo ayudar a implementarlo cuando desees.
  };

  cargarUsuarios();
});
