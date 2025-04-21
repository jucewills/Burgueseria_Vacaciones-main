document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formCrearUsuario");
    const tipoContrato = document.getElementById("tipoContrato");
    const campoFinContrato = document.getElementById("campoFinContrato");
    const mensajeError = document.getElementById("mensajeError");
  
    // Mostrar campo de fecha fin si contrato es definido
    tipoContrato.addEventListener("change", () => {
      campoFinContrato.style.display = tipoContrato.value === "Definido" ? "block" : "none";
    });
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const nombre = document.getElementById("nombre").value.trim();
      const documento = document.getElementById("documento").value.trim();
      const usuario = document.getElementById("usuario").value.trim();
      const correo = document.getElementById("correo").value.trim();
      const cargo = document.getElementById("cargo").value;
      const salario = parseInt(document.getElementById("salario").value);
      const fechaIngreso = document.getElementById("fechaIngreso").value;
      const tipo = tipoContrato.value;
      const fechaFin = document.getElementById("fechaFinContrato").value;
      const rol = document.getElementById("rol").value;
  
      if (
        !nombre || !documento || !usuario || !correo || !cargo || !salario ||
        !fechaIngreso || !tipo || !rol ||
        (tipo === "Definido" && !fechaFin)
      ) {
        mensajeError.textContent = "⚠️ Todos los campos son obligatorios.";
        return;
      }
  
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const yaExiste = usuarios.some(u => u.usuario === usuario || u.documento === documento);
      if (yaExiste) {
        mensajeError.textContent = "⚠️ Ya existe un usuario con ese nombre de usuario o documento.";
        return;
      }
  
      const nuevoUsuario = {
        nombre,
        documento,
        usuario,
        correo,
        cargo,
        salario,
        fechaIngreso,
        tipoContrato: tipo,
        fechaFinContrato: tipo === "Definido" ? fechaFin : "",
        rol,
        contrasena: documento,
        contrasenaTemporal: true,
        activo: true,
        diasVacaciones: 30
      };
  
      usuarios.push(nuevoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
  
      alert("✅ Usuario creado exitosamente.");
      window.location.href = "admin-ver-usuarios.html";
    });
  });
  