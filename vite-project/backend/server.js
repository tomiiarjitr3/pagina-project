const express = require('express');
const mysql = require('mysql2/promise'); // Usamos la versión promise para async/await
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Crear pool de conexiones a MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Verificar conexión a la base de datos
pool.getConnection()
  .then(connection => {
    console.log('✅ Conectado a MySQL!');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Error de conexión a MySQL:', err.message);
  });

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('🚀 Backend funcionando!');
});

// Ejemplo: Obtener datos
app.get('/api/data', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tu_tabla');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});

// Ejemplo: Insertar datos
app.post('/api/data', async (req, res) => {
  const { nombre, email } = req.body;
  
  if (!nombre || !email) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, email) VALUES (?, ?)',
      [nombre, email]
    );
    res.status(201).json({ id: result.insertId, nombre, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear registro' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🖥️  Servidor backend en http://localhost:${PORT}`);
});