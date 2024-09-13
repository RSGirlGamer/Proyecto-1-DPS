//Importacion de loginUser
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Card } from 'react-bootstrap';
import { loginUser } from '../api/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser({ email, password });
      console.log('Inicio de sesión exitoso:', result);
      localStorage.setItem('token', result.token); 
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Error en el inicio de sesión:', error.response ? error.response.data : error.message);
      alert('Hubo un problema al iniciar sesión. Por favor, intente de nuevo.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '400px', padding: '20px', boxShadow: '0 10px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label htmlFor="email">Correo:</Form.Label>
            <Form.Control
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group id="password">
            <Form.Label htmlFor="password">Contraseña:</Form.Label>
            <Form.Control
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Button type="submit">Iniciar Sesión</Button>
          </Form.Group>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
