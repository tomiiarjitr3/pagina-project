const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Multer para archivos (guardamos en memoria, luego podrías guardar en disco si preferís)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Conexión pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// ------------------ RUTAS ------------------

// Registro
app.post('/api/register', upload.single('fotoPerfil'), async (req, res) => {
  const { nombre, telefono, cuit, correo, password } = req.body;
  const fotoPerfil = req.file ? req.file.buffer : null;

  if (!nombre || !telefono || !cuit || !correo || !password) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, telefono, cuit, correo, password, fotoPerfil) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, telefono, cuit, correo, hashedPassword, fotoPerfil]
    );

    const institutionData = { nombre, telefono, cuit, fotoPreview: null };
    const userData = { id: result.insertId, correo };

    res.status(201).json({ institutionData, userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { correo, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }

    const institutionData = {
      nombre: user.nombre,
      telefono: user.telefono,
      cuit: user.cuit,
      fotoPreview: user.fotoPerfil ? `data:image/jpeg;base64,${user.fotoPerfil.toString('base64')}` : null,
    };

    const userData = { id: user.id, correo: user.correo };

    res.json({ institutionData, userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en login' });
  }
});

// ------------------ START ------------------
app.listen(PORT, () => {
  console.log(`🖥️ Servidor backend en http://localhost:${PORT}`);
});