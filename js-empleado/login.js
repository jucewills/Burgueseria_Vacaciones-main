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
