import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Card, Col, Row, ToastContainer, FormGroup, Toast, Container, Spinner } from 'react-bootstrap';
import { getRoles, registerUser } from '../services/api';
import { QueryClient, useMutation, useQuery } from 'react-query';
import SelectCustom from '../components/select';

const Register = () => {
    const queryClient = new QueryClient()
    const [nombre, setNombre] = useState('');
    const [toast, setToast] = useState({show: false});
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [correo_electronico, setEmail] = useState('');
    const [contrasena, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rol_id, setRole] = useState(0);
    // Consulta para obtener roles disponibles 
    const { data: roles, isLoading } = useQuery('roles', getRoles)
    const navigate = useNavigate();

    // Muestra para registrar un nuevo usuario
    const registerMutation = useMutation(registerUser, {
        onSuccess: () => {
            queryClient.invalidateQueries("users")
            navigate('/login');
        },
        onError: (e) => {
            setToast({type: 'danger', header: 'Error', show: true, message: e})
        }
    })

    // Maneja el envio del formulario
    const handleSubmit = async (e) => {
    e.preventDefault();
    if (contrasena !== confirmPassword) {
        setToast({type: 'danger', header: 'Error', show: true, message: "Las contraseñas no coinciden"})
        return;
    }
    const userData = { nombre, nombre_usuario: nombreUsuario, correo_electronico, contrasena, rol_id, estado: "activo" };
    registerMutation.mutate(userData)
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  if(isLoading) {
    return (
        <Container style={{marginTop: "20%"}}>
            <Row className="align-items-center">
                <Col className="col-6"></Col>
                <Col className="align-self-center">
                    <Spinner animation="border" variant="glaucous" />
                </Col>
            </Row>
        </Container>
    )
  }

  return (
    <>
        <div className="d-flex justify-content-center align-items-center vh-100">
        <Card style={{ width: '400px', boxShadow: '0 10px 8px rgba(0, 0, 0, 0.1)' }}>
            <Card.Header className="text-bg-rust">
                <h2 className="text-center">Registrarse</h2>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group id="nombre">
                            <Form.Label htmlFor="nombre">Nombre:</Form.Label>
                            <Form.Control
                            type="text"
                            id="nombre"
                            value={nombre}
                            placeholder='Escribe tu Nombre'
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            />
                        </Form.Group>
                    </Row>
                    <Row className='mt-3'>
                        <Form.Group id="rnombre_usuario">
                            <Form.Label htmlFor="nombreUsuario">Nombre de Usuario:</Form.Label>
                            <Form.Control
                            type="text"
                            id="nombreUsuario"
                            value={nombreUsuario}
                            placeholder='Escribe tu Usuario'
                            onChange={(e) => setNombreUsuario(e.target.value)}
                            required
                            />
                        </Form.Group>
                    </Row>
                    <Row className='mt-3'>
                        <Form.Group id="rcorreo">
                            <Form.Label htmlFor="email">Correo:</Form.Label>
                            <Form.Control
                            type="email"
                            id="email"
                            value={correo_electronico}
                            placeholder='Escribe tu Correo'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                        </Form.Group>
                    </Row>
                    <Row className='mt-3'>
                        <Form.Group id="rcontrasena">
                            <Form.Label htmlFor="password">Contraseña:</Form.Label>
                            <Form.Control
                            type="password"
                            id="password"
                            value={contrasena}
                            placeholder='Escribe tu Contraseña'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                        </Form.Group>
                    </Row>
                    <Row className='mt-3'>
                        <Form.Group id="confirmarcontrasena">
                            <Form.Label htmlFor="confirmPassword">Confirmar Contraseña:</Form.Label>
                            <Form.Control
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            placeholder='Escribe tu Contraseña de Nuevo'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            />
                        </Form.Group>
                    </Row>
                    <Row className='mt-3'>
                        <FormGroup controlid="form.ControlRol">
                            <Form.Label>Rol</Form.Label>
                            <SelectCustom options={roles} required={true} value={{value: rol_id, label: roles?.find(e => e.value === rol_id)?.label}} onChange={e => setRole(e.value)}/>
                        </FormGroup>
                    </Row>
                    <Row>
                        <Form.Group className='mt-3'>
                        <Row>
                            <Col className='col-auto'>
                                <Button variant='rust' type="submit">Registrarse</Button>
                            </Col>
                            <Col>
                                <Button active variant="secondary" type="button" onClick={handleLoginRedirect}>Volver a Iniciar Sesión</Button>
                            </Col>
                        </Row>
                    </Form.Group>
                    </Row>
                </Form>
            </Card.Body>
            
        </Card>
        </div>
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
    </>
  );
};

export default Register;