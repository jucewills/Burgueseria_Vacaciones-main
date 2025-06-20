document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const errorMensaje = document.getElementById("errorMensaje");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuarioInput = document.getElementById("usuario").value.trim();
    const contrasenaInput = document.getElementById("contrasena").value.trim();

    try {
      const response = await fetch("https://vacation-tracker-juliocesarwil.replit.app/api/users");
      const usuarios = await response.json();

      const usuarioEncontrado = usuarios.find(
        (u) =>
          (u.username === usuarioInput || u.email === usuarioInput) &&
          u.password === contrasenaInput
      );

      if (!usuarioEncontrado) {
        mostrarError("Usuario no encontrado o contraseña incorrecta.");
        return;
      }

      if (!usuarioEncontrado.activo) {
        mostrarError("Tu usuario está inactivo. Contacta al administrador.");
        return;
      }

      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

      if (usuarioEncontrado.contrasenaTemporal) {
        window.location.href = "HTML-empleado/cambiar-contrasena.html";
      } else if (usuarioEncontrado.role === "admin") {
        window.location.href = "HTML-admin/admin-dashboard.html";
      } else {
        window.location.href = "HTML-empleado/empleado-dashboard.html";
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      mostrarError("Error al conectar con el servidor.");
    }
  });

  function mostrarError(mensaje) {
    errorMensaje.textContent = mensaje;
    errorMensaje.style.color = "red";
  }
});
