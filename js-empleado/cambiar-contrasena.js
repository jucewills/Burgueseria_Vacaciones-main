document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formCambioContrasena");
    const mensajeError = document.getElementById("mensajeError");
  
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  
    if (!usuarioActivo) {
      window.location.href = "../index.html"; // Si no hay sesión, redirige
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nueva = document.getElementById("nuevaContrasena").value;
      const confirmar = document.getElementById("confirmarContrasena").value;
  
      // Validaciones
      if (nueva !== confirmar) {
        mostrarError("Las contraseñas no coinciden.");
        return;
      }
  
      if (!validarContrasena(nueva)) {
        mostrarError("La contraseña debe tener mínimo 10 caracteres, una mayúscula, un número y un carácter especial.");
        return;
      }
  
      // Actualizar usuario
      const indexUsuario = usuarios.findIndex(u => u.usuario === usuarioActivo.usuario);
      if (indexUsuario !== -1) {
        usuarios[indexUsuario].contrasena = nueva;
        usuarios[indexUsuario].contrasenaTemporal = false;
  
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem("usuarioActivo", JSON.stringify(usuarios[indexUsuario]));
  
        // Redirige según el rol
        if (usuarios[indexUsuario].rol === "admin") {
          window.location.href = "../HTML-admin/admin-dashboard.html";
        } else {
          window.location.href = "../HTML-empleado/empleado-dashboard.html";
        }
      }
    });
  
    function validarContrasena(contrasena) {
      const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10,}$/;
      return regex.test(contrasena);
    }
  
    function mostrarError(mensaje) {
      mensajeError.textContent = mensaje;
    }
  });
  