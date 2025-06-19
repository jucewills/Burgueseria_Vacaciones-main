-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS sistema_de_vacaciones;
USE sistema_de_vacaciones;

-- Crear tabla de usuarios si no existe
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_completo VARCHAR(100) NOT NULL,
  documento VARCHAR(20) NOT NULL UNIQUE,
  correo VARCHAR(100) NOT NULL UNIQUE,
  cargo VARCHAR(50),
  salario DECIMAL(10, 2),
  fecha_ingreso DATE,
  tipo_contrato VARCHAR(20),
  fecha_finalizacion DATE,
  rol ENUM('admin', 'empleado') DEFAULT 'empleado',
  contrasena VARCHAR(255) NOT NULL
);

-- Borrar documentos específicos para evitar duplicados
DELETE FROM usuarios WHERE documento IN ('123456789', '987654321', '123456780');

-- Insertar o actualizar usuario Juan Pérez
INSERT INTO usuarios (
  nombre_completo, documento, correo, cargo, salario,
  fecha_ingreso, tipo_contrato, fecha_finalizacion, rol, contrasena
) VALUES (
  'Juan Pérez', '987654321', 'juan@example.com', 'Desarrollador', 3500000.00,
  '2023-07-01', 'Indefinido', NULL, 'empleado', '1234'
)
ON DUPLICATE KEY UPDATE
  nombre_completo = VALUES(nombre_completo),
  correo = VALUES(correo),
  cargo = VALUES(cargo),
  salario = VALUES(salario),
  fecha_ingreso = VALUES(fecha_ingreso),
  tipo_contrato = VALUES(tipo_contrato),
  fecha_finalizacion = VALUES(fecha_finalizacion),
  rol = VALUES(rol),
  contrasena = VALUES(contrasena);

-- Insertar o actualizar usuario Ana Torres
INSERT INTO usuarios (
  nombre_completo, documento, correo, cargo, salario,
  fecha_ingreso, tipo_contrato, fecha_finalizacion, rol, contrasena
) VALUES (
  'Ana Torres', '123456789', 'ana.torres@example.com', 'Analista', 3000000.00,
  '2023-06-01', 'Término fijo', '2024-06-01', 'empleado', 'clave123'
)
ON DUPLICATE KEY UPDATE
  nombre_completo = VALUES(nombre_completo),
  correo = VALUES(correo),
  cargo = VALUES(cargo),
  salario = VALUES(salario),
  fecha_ingreso = VALUES(fecha_ingreso),
  tipo_contrato = VALUES(tipo_contrato),
  fecha_finalizacion = VALUES(fecha_finalizacion),
  rol = VALUES(rol),
  contrasena = VALUES(contrasena);
documentocorreocorreo
