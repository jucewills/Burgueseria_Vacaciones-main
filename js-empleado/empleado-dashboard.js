document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  
    if (!usuario || usuario.rol !== "empleado") {
      window.location.href = "../index.html";
      return;
    }
  
    // Mostrar información
    document.getElementById("nombre").textContent = usuario.nombre;
    document.getElementById("documento").textContent = usuario.documento;
    document.getElementById("correo").textContent = usuario.correo;
    document.getElementById("cargo").textContent = usuario.cargo;
    document.getElementById("salario").textContent = usuario.salario;
    document.getElementById("fechaIngreso").textContent = usuario.fechaIngreso;
    document.getElementById("tipoContrato").textContent = usuario.tipoContrato;
    document.getElementById("fechaFinContrato").textContent = usuario.fechaFinContrato;
  
    // Simular días de vacaciones disponibles (ejemplo)
    const diasDisponibles = usuario.diasVacaciones || 30;
    document.getElementById("diasDisponibles").textContent = diasDisponibles;
  });
  
  function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "../index.html";
  }

  // Generar certificado laboral en PDF
  async function generarCertificadoPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario) return alert("No se pudo cargar la información del usuario.");
  
    // Marca de agua
    doc.setFontSize(60);
    doc.setTextColor(200);
    doc.text("CONFIDENCIAL", 35, 150, { angle: 45 });
  
    // Encabezado
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text("Medellín, " + new Date().toLocaleDateString("es-CO"), 20, 30);
  
    doc.setFont(undefined, "bold");
    doc.text("LA BURGUESERÍA MEDELLÍN", 20, 40);
    doc.text("ÁREA DE TALENTO HUMANO", 20, 46);
    doc.text("CERTIFICA QUE:", 20, 52);
  
    doc.setFont(undefined, "normal");
  
    // Cuerpo
    const cuerpo = `
  ${usuario.nombre.toUpperCase()}, identificado(a) con documento de identidad No. 
  ${usuario.documento}, labora actualmente con nosotros desde el 
  ${usuario.fechaIngreso}, desempeñándose como ${usuario.cargo} 
  con un contrato a término ${usuario.tipoContrato.toUpperCase()}.
  
  Cumple una jornada de 48 horas semanales, de acuerdo con su contrato.
  
  Este certificado se expide a solicitud del interesado a los ${new Date().getDate()} 
  días del mes de ${new Date().toLocaleString('es-CO', { month: 'long' }).toUpperCase()} del año 
  ${new Date().getFullYear()}.
  `;
  
    doc.text(cuerpo, 20, 65, { maxWidth: 170, lineHeightFactor: 1.5 });
  
    // Firma
    doc.text("Cordialmente,", 20, 135);
    doc.setFont(undefined, "bold");
    doc.text("Gerencia de Talento Humano", 20, 145);
    doc.setFont(undefined, "normal");
    doc.text("La Burguesería Medellín", 20, 150);
  
    // Guardar PDF
    doc.save(`CertificadoLaboral_${usuario.nombre}.pdf`);
  }