document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formRestablecer");
    const mensajeError = document.getElementById("mensajeError");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const correo = document.getElementById("correo").value.trim().toLowerCase();
      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  
      const usuario = usuarios.find(u => u.correo && u.correo.toLowerCase() === correo);
  
      if (!usuario) {
        mostrarError("Correo no registrado.");
        return;
      }
  
      // Asignar nueva contraseña temporal (documento)
      usuario.contrasena = usuario.documento;
      usuario.contrasenaTemporal = true;
  
      // Actualizar en el arreglo
      usuarios = usuarios.map(u => u.usuario === usuario.usuario ? usuario : u);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
  
      alert("📨 Se ha enviado un correo con instrucciones para restablecer tu contraseña (simulado).");
  
      // Redirigir al login
      window.location.href = "../index.html";
    });
  
    function mostrarError(mensaje) {
      mensajeError.textContent = mensaje;
    }
  });
  