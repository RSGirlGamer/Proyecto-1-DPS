const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const proyectosRoutes = require('./routes/proyectosRoutes');
const tareasRoutes = require('./routes/tareasRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const permissionsRoutes = require('./routes/permissionsRoutes');
const cors = require('cors'); // Asegúrate de importar cors
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configura cors para permitir solicitudes desde el frontend
app.use(cors({
  origin: 'http://localhost:3001', // URL del frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(bodyParser.json());
app.use('/api/proyectos', proyectosRoutes);
app.use('/api/tareas', tareasRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/permisos', permissionsRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
