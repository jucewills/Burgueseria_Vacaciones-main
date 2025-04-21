document.addEventListener("DOMContentLoaded", () => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuarioActivo || usuarioActivo.rol !== "admin") {
      window.location.href = "../index.html";
      return;
    }
  
    const tabla = document.getElementById("tablaUsuarios");
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  
    function renderTabla() {
      tabla.innerHTML = "";
  
      usuarios.forEach((user, index) => {
        const fila = document.createElement("tr");
  
        fila.innerHTML = `
          <td>${user.usuario}</td>
          <td>${user.nombre}</td>
          <td>${user.rol}</td>
          <td>${user.activo ? "Activo" : "Inactivo"}</td>
          <td>
            <button onclick="toggleEstado(${index})">
              ${user.activo ? "Desactivar" : "Activar"}
            </button>
          </td>
        `;
  
        tabla.appendChild(fila);
      });
    }
  
    window.toggleEstado = (index) => {
      usuarios[index].activo = !usuarios[index].activo;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      renderTabla();
    };
  
    renderTabla();
  });
  