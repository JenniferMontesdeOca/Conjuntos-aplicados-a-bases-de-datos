
-- Crear la base de datos
CREATE DATABASE BancoDB;

-- Usar la base de datos
USE BancoDB;

-- Crear tabla Clientes
CREATE TABLE Clientes (
    id_cliente INT PRIMARY KEY,
    nombre VARCHAR(100),
    ciudad VARCHAR(100)
);

-- Crear tabla Cuentas
CREATE TABLE Cuentas (
    id_cuenta INT PRIMARY KEY,
    id_cliente INT,
    tipo_cuenta VARCHAR(50),
    saldo DECIMAL(10, 2),
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente)
);

-- Insertar registros en la tabla Clientes
INSERT INTO Clientes (id_cliente, nombre, ciudad) VALUES (1, 'Pedro', 'Guatemala');
INSERT INTO Clientes (id_cliente, nombre, ciudad) VALUES (2, 'Ana', 'Quetzaltenango');
INSERT INTO Clientes (id_cliente, nombre, ciudad) VALUES (3, 'Luis', 'Antigua');
INSERT INTO Clientes (id_cliente, nombre, ciudad) VALUES (4, 'Marta', 'Escuintla');

-- Insertar registros en la tabla Cuentas
INSERT INTO Cuentas (id_cuenta, id_cliente, tipo_cuenta, saldo) VALUES (1, 1, 'Monetaria', 1000.00);
INSERT INTO Cuentas (id_cuenta, id_cliente, tipo_cuenta, saldo) VALUES (2, 2, 'Ahorro', 1500.00);
INSERT INTO Cuentas (id_cuenta, id_cliente, tipo_cuenta, saldo) VALUES (3, 3, 'Monetaria', 2000.00);
INSERT INTO Cuentas (id_cuenta, id_cliente, tipo_cuenta, saldo) VALUES (4, 4, 'Ahorro', 2500.00);
