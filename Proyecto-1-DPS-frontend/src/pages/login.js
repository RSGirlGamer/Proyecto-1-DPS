import React, { useState } from 'react';
import { Button, Form, Card, ToastContainer, Toast, Row, Col } from 'react-bootstrap';
import { useAuth } from '../services/auth_provider';


const Login = () => {

    const [correo_electronico, setEmail] = useState('');
    const [contrasena, setPassword] = useState('');
    const [toast, setToast] = useState({show: false});
    const auth = useAuth();

    

  const handleSubmit = async (e) => {
    e.preventDefault()
    auth.initLogin({correo_electronico, contrasena})
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '400px', boxShadow: '0 10px 8px rgba(0, 0, 0, 0.1)' }}>
        <Card.Header className="text-bg-glaucous">
            <h2 className="text-center">Iniciar Sesión</h2>
        </Card.Header>
        <Card.Body>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Form.Group id="email">
                        <Form.Label htmlFor="email">Correo:</Form.Label>
                        <Form.Control
                        type="email" 
                        id="email"
                        value={correo_electronico}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </Form.Group>
                </Row>
                <Row className='mt-3'>
                    <Form.Group id="password">
                        <Form.Label htmlFor="password">Contraseña:</Form.Label>
                        <Form.Control
                        type="password"
                        id="password"
                        value={contrasena}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </Form.Group>
                </Row>
                <Row className='mt-3'>
                    <Col className='col-auto'>
                        <Form.Group>
                            <Button variant='glaucous' type="submit">Iniciar Sesión</Button>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Button variant='rust' href='/register'>Registrar</Button>
                        </Form.Group>
                    </Col>
                    
                </Row>
            </Form>
        </Card.Body>
      </Card>
      <ToastContainer
            className="p-3"
            position="top-center"
            style={{ zIndex: 1 }}
        >
            <Toast onClose={() => setToast({...toast, show: false})} bg={toast?.type} show={toast.show} delay={5000} autohide>
                <Toast.Header closeButton={false}>
                    <strong className="me-auto">{toast.header}</strong>
                </Toast.Header>
                <Toast.Body className="text-center">{toast.message}</Toast.Body>
            </Toast>
        </ToastContainer>
    </div>
    
  );
};

export default Login;