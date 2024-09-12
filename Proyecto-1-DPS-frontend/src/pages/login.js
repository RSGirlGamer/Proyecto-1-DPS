import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Card} from "react-bootstrap";



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); 
  };

  return (

    
    <div className="d-flex justify-content-center align-items-center vh-100">
    <Card style={{  width: '400px', padding: '20px', boxShadow: '0 10px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>

    <Form onSubmit={handleSubmit}>
      <Form.Group id="correo"> 
        <Form.Label htmlFor="email">Correo:</Form.Label>
        <Form.Control
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group id="contrasena">
        <Form.Label htmlFor="password">Contraseña:</Form.Label>
        <Form.Control
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group id='botones'>
        <Button variant="primary" type="submit">Iniciar</Button>
        <Button variant="secondary" type="button" onClick={handleRegisterRedirect} className="ms-2">
          Registrarse
        </Button>
      </Form.Group>
    </Form> 
    </Card>
  </div>
);
};

export default Login;


