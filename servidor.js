const mysql = require('mysql2');

// Configuración de conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Reemplaza con tu usuario de MySQL
  password: 'cWa2F$xY', // Reemplaza con tu contraseña de MySQL
  database: 'BancoDB'
});

// Conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error conectándose a la base de datos:', err.message);
    return;
  }
  console.log('Conexión exitosa a la base de datos BancoDB.');

  // Llamada a las funciones en orden
  mostrarCuentas(() => {
    mostrarClientes(() => {
      mostrarCuentasAsociadas(() => {
        mostrarClientesSinCuentas(() => {
          // Cierra la conexión después de que todas las consultas terminen
          console.log('Finalizando conexión.');
          connection.end();
        });
      });
    });
  });
});

// Listado de todas las cuentas creadas
function mostrarCuentas(callback) {
  connection.query('SELECT * FROM Cuentas', (err, results) => {
    if (err) {
      console.error('Error obteniendo las cuentas:', err.message);
      callback();
      return;
    }
    console.log('== Listado de todas las cuentas creadas ==');
    console.table(results);
    callback();
  });
}

// Listado de todos los clientes creados
function mostrarClientes(callback) {
  connection.query('SELECT * FROM Clientes', (err, results) => {
    if (err) {
      console.error('Error obteniendo los clientes:', err.message);
      callback();
      return;
    }
    console.log('== Listado de todos los clientes creados ==');
    console.table(results);
    callback();
  });
}

// Listado de todas las cuentas que están asociadas a clientes
function mostrarCuentasAsociadas(callback) {
  const query = `
    SELECT 
      Cuentas.id_cuenta, 
      Cuentas.tipo_cuenta, 
      Clientes.nombre, 
      Cuentas.saldo 
    FROM 
      Cuentas 
    JOIN 
      Clientes 
    ON 
      Cuentas.id_cliente = Clientes.id_cliente
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error obteniendo las cuentas asociadas:', err.message);
      callback();
      return;
    }
    console.log('== Listado de todas las cuentas que están asociadas a clientes ==');
    console.table(results);
    callback();
  });
}

// Listado de todos los clientes que no tienen cuentas asociadas
function mostrarClientesSinCuentas(callback) {
  const query = `
    SELECT 
      Clientes.id_cliente, 
      Clientes.nombre 
    FROM 
      Clientes 
    LEFT JOIN 
      Cuentas 
    ON 
      Clientes.id_cliente = Cuentas.id_cliente 
    WHERE 
      Cuentas.id_cliente IS NULL
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error obteniendo los clientes sin cuentas:', err.message);
      callback();
      return;
    }
    console.log('== Listado de todos los clientes que no tienen cuentas asociadas ==');
    console.table(results);
    callback();
  });
}
