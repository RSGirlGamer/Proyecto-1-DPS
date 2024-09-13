//Importacion de registerUser
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Card } from 'react-bootstrap';
import { registerUser } from '../api/auth';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    //No se ha puesto el apartado parar elegir ROL
    try {
      const userData = { nombre, nombre_usuario: nombreUsuario, email, password };
      const result = await registerUser(userData);
      console.log('Registro exitoso:', result);
      navigate('/login');
    } catch (error) {
      console.error('Error en el registro:', error.response ? error.response.data : error.message);
      alert('Hubo un problema al registrarse. Por favor, intente de nuevo.');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '400px', padding: '20px', boxShadow: '0 10px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2 className="text-center mb-4">Registrarse</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group id="rnombre">
            <Form.Label htmlFor="nombre">Nombre:</Form.Label>
            <Form.Control
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group id="rnombre_usuario">
            <Form.Label htmlFor="nombreUsuario">Nombre de Usuario:</Form.Label>
            <Form.Control
              type="text"
              id="nombreUsuario"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group id="rcorreo">
            <Form.Label htmlFor="email">Correo:</Form.Label>
            <Form.Control
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group id="rcontrasena">
            <Form.Label htmlFor="password">Contraseña:</Form.Label>
            <Form.Control
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group id="confirmarcontrasena">
            <Form.Label htmlFor="confirmPassword">Confirmar Contraseña:</Form.Label>
            <Form.Control
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Button type="submit">Registrarse</Button>
            <Button variant="secondary" type="button" onClick={handleLoginRedirect}>Volver a Iniciar Sesión</Button>
          </Form.Group>
        </Form>
      </Card>
    </div>
  );
};

export default Register;


