document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const errorMensaje = document.getElementById("errorMensaje");
    const btnResetUsuarios = document.getElementById("btnResetUsuarios");
  
    // Evento de inicio de sesión
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const usuarioInput = document.getElementById("usuario").value.trim();
      const contrasenaInput = document.getElementById("contrasena").value.trim();
  
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  
      const usuarioEncontrado = usuarios.find(
        (u) => u.usuario === usuarioInput || u.documento === usuarioInput
      );
  
      if (!usuarioEncontrado) {
        mostrarError("Usuario no encontrado.");
        return;
      }
  
      if (!usuarioEncontrado.activo) {
        mostrarError("Tu usuario está inactivo. Contacta al administrador.");
        return;
      }
  
      if (usuarioEncontrado.contrasena !== contrasenaInput) {
        mostrarError("Contraseña incorrecta.");
        return;
      }
  
      // Guardar usuario activo
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
  
      if (usuarioEncontrado.contrasenaTemporal) {
        window.location.href = "HTML-empleado/cambiar-contrasena.html";
      } else if (usuarioEncontrado.rol === "admin") {
        window.location.href = "HTML-admin/admin-dashboard.html";
      } else {
        window.location.href = "HTML-empleado/empleado-dashboard.html";
      }
    });
  
    // Botón para restablecer usuarios de prueba
    btnResetUsuarios.addEventListener("click", () => {
        const usuariosPrueba = [
          {
            nombre: "Carlos Pérez",
            documento: "123456789",
            usuario: "carlos",
            contrasena: "123456789",
            contrasenaTemporal: true,
            correo: "juliocesarwil88@gmail.com",
            rol: "empleado",
            activo: true,
            cargo: "Mesero",
            salario: "$2.500.000",
            fechaIngreso: "2023-05-10",
            tipoContrato: "Indefinido",
            fechaFinContrato: "",
            diasVacaciones: 30
          },
          {
            nombre: "Laura Gómez",
            documento: "987654321",
            usuario: "laura",
            contrasena: "987654321",
            contrasenaTemporal: true,
            correo: "admin@burgueseria.com",
            rol: "admin",
            activo: true,
            cargo: "Administrador",
            salario: 3500000,
            fechaIngreso: "2022-01-15",
            tipoContrato: "Definido",
            fechaFinContrato: "2025-12-31",
            diasVacaciones: 30
          }
        ];
      
        localStorage.setItem("usuarios", JSON.stringify(usuariosPrueba));
        alert("✅ Usuarios de prueba restablecidos");
      });      
      
  
    function mostrarError(mensaje) {
      errorMensaje.textContent = mensaje;
      errorMensaje.style.color = "red";
    }
  });
  