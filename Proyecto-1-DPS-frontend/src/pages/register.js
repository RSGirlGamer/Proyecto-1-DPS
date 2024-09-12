import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Card} from "react-bootstrap";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleLoginRedirect = () => {
    navigate('/login'); 
  };


  return (

    <div className="d-flex justify-content-center align-items-center vh-100">
    <Card style={{  width: '400px', padding: '20px', boxShadow: '0 10px 8px rgba(0, 0, 0, 0.1)' }}>
    <h2 className="text-center mb-4">Registrarse</h2>

      <Form onSubmit={handleSubmit}>
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

        <Form.Group id = "rcontrasena">
          <Form.Label htmlFor="password">Contraseña:</Form.Label>
          <Form.Control
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group id = "confirmarcontrasena">
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

