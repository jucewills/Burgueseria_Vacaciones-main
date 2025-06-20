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

  window.toggleEstado = async (id, estadoActual) => {
    const confirmar = confirm(`¿Estás seguro de que quieres ${estadoActual ? "desactivar" : "activar"} este usuario?`);
    if (!confirmar) return;
  
    try {
      const response = await fetch(`https://vacation-tracker-juliocesarwil.replit.app/api/users/${id}/active`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !estadoActual })
      });
  
      if (!response.ok) throw new Error("Error al actualizar estado");
  
      const data = await response.json(); // opcional, por si deseas mostrar info del usuario
  
      alert(`✅ Usuario ${!estadoActual ? "activado" : "desactivado"} correctamente`);
  
      // Esperar medio segundo antes de recargar la tabla
      setTimeout(() => {
        cargarUsuarios();
      }, 500);
    } catch (error) {
      console.error("Error actualizando estado del usuario:", error);
      alert("❌ Hubo un error al actualizar el estado");
    }
  };

  cargarUsuarios();
});
