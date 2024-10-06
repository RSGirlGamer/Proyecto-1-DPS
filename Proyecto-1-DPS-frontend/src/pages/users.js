import { Badge, Button, Card, Col, Container, Form, FormGroup, InputGroup, Modal, Pagination, Row, Spinner, Table, Toast, ToastContainer } from "react-bootstrap";
import NavbarCustom from "../components/navbar";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteUser, editPassword, editUser, editUserRole, getRoles, getUsers } from "../services/api";
import SelectCustom from "../components/select";
import DatePickerCustom from "../components/datepicker";


function Users() {

    const queryClient = useQueryClient()
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [editPass, setEditPass] = useState(false);
    const [user, setUser] = useState({});
    const [toast, setToast] = useState({show: false});
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const offset = currentPage * itemsPerPage;
    const { data: users, isLoading } = useQuery('users', getUsers)
    const { data: roles } = useQuery('roles', getRoles)

    const turnOnEditPass = (show) => {
        setUser({...user, contrasena: ""})
        setEditPass(show)
    }

    const handleClose = () => {
        setShow(false)
        setShowDelete(false)
        setEditPass(false)
        setShowPass(false)
        setUser({})
    }

    const handleShow = (user) => {
        setUser(user)
        setShow(true)
    };

    const handleShowDelete = (user) => {
        setUser(user)
        setShowDelete(true)
    };

    const editMutation = useMutation(editUser, {
        onSuccess: () => {
            queryClient.invalidateQueries("users")
            setToast({type: 'success', header: 'Modificado', show: true, message: 'Se ha modificado correctamente'})
        },
        onError: (e) => {
            setToast({type: 'danger', header: 'Error', show: true, message: e})
        }
    })

    const deleteMutation = useMutation(deleteUser, {
        onSuccess: () => {
            queryClient.invalidateQueries("users")
            if(currentPage > 0 && users.length > 5) {
                setCurrentPage(0)
            }
            setToast({type: 'success', header: 'Eliminado', show: true, message: 'Se ha eliminado correctamente'})
        },
        onError: (e) => {
            setToast({type: 'danger', header: 'Error', show: true, message: e})
        }
    })

    const editRoleUserMutation = useMutation(editUserRole, {
        onSuccess: () => {
            editMutation.mutate({...user, rol_id: undefined, user_role: undefined})
        },
        onError: (e) => {
            setToast({type: 'danger', header: 'Error', show: true, message: e})
        }
    })

    const editPasswordMutation = useMutation(editPassword, {
        onSuccess: () => {
            editRoleUserMutation.mutate(user)
        },
        onError: (e) => {
            setToast({type: 'danger', header: 'Error', show: true, message: e})
        }
    })

    const updateUser = () => {
        const userp = users.find(u => u.id === user.id)
        if(user.contrasena !== userp.contrasena) {
            editPasswordMutation.mutate({id: user.id, contrasena: user.contrasena})
        } else if(userp.rol_id !== user.rol_id) {
            editRoleUserMutation.mutate(user)
        } else {
            editMutation.mutate({...user, rol_id: undefined, user_role: undefined})
        }

        handleClose()
    }

    const removeUser = () => {
        deleteMutation.mutate(user)
        handleClose()
    }

    const nextPage = () => {
        setCurrentPage(prev => prev + 1)
    }
    const prevPage = () => {
        setCurrentPage(prev => prev - 1)
    }

    const itemPages = () => {
        const paginator = []
        for(let i = 0; i < Math.ceil(users?.length / itemsPerPage); i++) {
            paginator.push(<Pagination.Item key={i} onClick={() => setCurrentPage(i)} active={i === currentPage}>{i + 1}</Pagination.Item>)  
        }
        return paginator
    }

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

    return(
        <>
            <NavbarCustom></NavbarCustom>
            <Container fluid>
                <h1 className="py-3 text-black">Usuarios</h1>
                <Card bg="white">
                    <Card.Body>
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>Nombre Completo</th>
                                    <th>Rol</th>
                                    <th>Correo Electrónico</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((e, i) => {
                                    if(i >= offset && i < offset + itemsPerPage) {
                                        const colors = ["rust", "turquoise", "dark-spring-green", "purpureus", "glaucous"]
                                         return (
                                            <tr key={e.id}>
                                                <td>{e.nombre_usuario}</td>
                                                <td>{e.nombre_completo}</td>
                                                <td>
                                                    <Badge bg={colors[e.rol_id - 1]}>{e.user_role}</Badge>
                                                </td>
                                                <td>{e.correo_electronico}</td>
                                                <td>
                                                    <Container>
                                                        <Row>
                                                            <Col md={5} lg={3} xl={3}>
                                                                <Button onClick={() => handleShow(e)} variant="glaucous">
                                                                    <i className="bi bi-pencil"></i>
                                                                </Button>
                                                            </Col>
                                                            <Col md={5} lg={1} xl={6}>
                                                                <Button onClick={() => handleShowDelete(e)} active variant="danger">
                                                                    <i className="bi bi-trash"></i>
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    return null;
                                })}
                            </tbody>   
                        </Table>
                        <Pagination className="d-flex justify-content-center pagination-glaucous">
                            <Pagination.Prev onClick={prevPage} disabled={currentPage === 0}/>
                            {itemPages()}
                            <Pagination.Next onClick={nextPage} disabled={currentPage + 1 === Math.ceil(users?.length / itemsPerPage)}/>
                        </Pagination>
                    </Card.Body>
                </Card>
            </Container>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlid="form.ControlUsername">
                                    <Form.Label>Nombre de Usuario</Form.Label>
                                    <Form.Control type="text" value={user?.nombre_usuario || ''} onChange={e => setUser({...user, nombre_usuario: e.target.value})} placeholder="deborarivas" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlid="form.ControlFullName">
                                    <Form.Label>Nombre Completo</Form.Label>
                                    <Form.Control type="text" value={user?.nombre_completo || ''} onChange={e => setUser({...user, nombre_completo: e.target.value})} placeholder="Débora Beatriz Rivas Sánchez" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup controlid="form.ControlRol">
                                    <Form.Label>Rol</Form.Label>
                                    <SelectCustom options={roles} value={{value: user?.rol_id, label: user?.user_role}} onChange={e => setUser({...user, rol_id: e.value, user_role: e.label})}/>
                                </FormGroup>
                                
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlid="form.ControlEmail">
                                    <Form.Label>Correo Electrónico</Form.Label>
                                    <Form.Control type="email" value={user?.correo_electronico || ''} onChange={e => setUser({...user, correo_electronico: e.target.value})} placeholder="deborarivas@gmail.com" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Label>Contraseña</Form.Label>
                                <InputGroup className="mb-3" controlid="form.ControlPassword">
                                    <Form.Control value={user?.contrasena || ''} disabled={!editPass} onChange={e => setUser({...user, contrasena: e.target.value})} type={showPass ? "text" : "password"} placeholder="*******" />
                                    {editPass ? <Button onClick={() => setShowPass(!showPass)} variant="outline-purpureus" id="button-addon2">
                                        {showPass ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash"></i>}
                                    </Button> : <Button onClick={() => turnOnEditPass(!editPass)} variant="outline-purpureus" id="button-addon2">
                                    <i className="bi bi-arrow-clockwise"></i>
                                    </Button>}
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <DatePickerCustom disabled startDate={user?.creado_en} dateFormat={"dd/MM/yyyy h:mm:ss aa"} label={"Creado en"} dateValue={user?.creado_en}/>
                            </Col>
                            <Col>
                                <DatePickerCustom disabled startDate={user?.actualizado_en} dateFormat={"dd/MM/yyyy h:mm:ss aa"} label={"Actualizado en"} dateValue={user?.actualizado_en}/>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="glaucous" onClick={updateUser}>
                        Actualizar
                    </Button>
                    <Button active variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showDelete} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>¿Deseas Eliminar este Usuario?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={removeUser} active variant="danger">Aceptar</Button>
                    <Button onClick={handleClose} active variant="secondary">Cancelar</Button>
                </Modal.Footer>
            </Modal>
            
            <ToastContainer
                className="p-3"
                position="top-center"
                style={{ zIndex: 1 }}
            >
                <Toast onClose={() => setToast({...toast, show: false})} bg={toast.type} show={toast.show} delay={5000} autohide>
                    <Toast.Header closeButton={false}>
                        <strong className="me-auto">{toast.header}</strong>
                    </Toast.Header>
                    <Toast.Body className="text-center">{toast.message}</Toast.Body>
                </Toast>
            </ToastContainer>
            
        </>
    )
}

export default Users;