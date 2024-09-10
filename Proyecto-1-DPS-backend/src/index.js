const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const proyectosRoutes = require('./routes/proyectosRoutes');
const tareasRoutes = require('./routes/tareasRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/proyectos', proyectosRoutes);
app.use('/api/tareas', tareasRoutes);
app.use('/api/usuarios', usuariosRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
