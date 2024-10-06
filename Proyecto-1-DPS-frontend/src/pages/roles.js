import { useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Pagination, Row, Spinner, Table, Toast, ToastContainer } from "react-bootstrap";
import { QueryClient, useMutation, useQuery } from "react-query";
import { editRole, editRolePermission, getPermissions, getRolesDefault } from "../services/api";
import NavbarCustom from "../components/navbar";

function Roles() {

    const queryClient = new QueryClient()
    const [show, setShow] = useState(false);
    const [onlyRole, setOnlyRole] = useState(null)
    const [rolePermission, setRolePermission] = useState({});
    const [toast, setToast] = useState({show: false});
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const offset = currentPage * itemsPerPage;
    const {refetch} = useQuery(['permissions', { id: onlyRole?.id }], () => getPermissions(onlyRole?.id), {
        enabled: onlyRole?.id != null,
        onSuccess: (response) => {
            const permission = response.data[0]
            setRolePermission({role: onlyRole, permission})
        }
    })
    const { data: roles, isLoading } = useQuery('roles', getRolesDefault)


    const handleClose = () => {
        setShow(false)
        setRolePermission(null)
    }

    const handleShow = (role) => {
        if(role?.id) {
            setOnlyRole(role)
            refetch()
        }
        setShow(true)
    };

    const editMutation = useMutation(editRole, {
        onSuccess: () => {
            console.log(rolePermission.permission)
            editRolePermissionMutation.mutate(rolePermission.permission)
        },
        onError: (e) => {
            setToast({type: 'danger', header: 'Error', show: true, message: e})
        }
    })

    const editRolePermissionMutation = useMutation(editRolePermission, {
        onSuccess: () => {
            queryClient.invalidateQueries("roles")
            queryClient.invalidateQueries(['permissions', { id: onlyRole?.id }])
            setToast({type: 'success', header: 'Modificado', show: true, message: 'Se ha modificado correctamente'})
            handleClose()
        },
        onError: (e) => {
            setToast({type: 'danger', header: 'Error', show: true, message: e})
        }
    })

    const updateRole = () => {
        editMutation.mutate(rolePermission.role)
        handleClose()
    }

    const nextPage = () => {
        setCurrentPage(prev => prev + 1)
    }
    const prevPage = () => {
        setCurrentPage(prev => prev - 1)
    }

    const onChangeChecked = (property, value) => {
        const permission = {...rolePermission?.permission, [property]: value}
        setRolePermission({...rolePermission, permission})
    }

    const onChangeInput = (property, value) => {
        const role = {...rolePermission?.role, [property]: value}
        setRolePermission({...rolePermission, role})
    }

    const itemPages = () => {
        const paginator = []
        for(let i = 0; i < Math.ceil(roles?.length / itemsPerPage); i++) {
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
                <Row>
                    <h1 className="py-3 text-black">Roles</h1>
                </Row>
                <Card bg="white">
                    <Card.Body>
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Descripcion</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles?.map((e, i) => {
                                    if(i >= offset && i < offset + itemsPerPage) {
                                         return (
                                            <tr key={e.id}>
                                                <td>{e.nombre}</td>
                                                <td>{e.descripcion}</td>
                                                <td>
                                                    <Container>
                                                        <Row>
                                                            <Col className="col-auto">
                                                                <Button onClick={() => handleShow(e)} variant="glaucous">
                                                                    <i className="bi bi-pencil"></i>
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
                            <Pagination.Next onClick={nextPage} disabled={currentPage + 1 === Math.ceil(roles?.length / itemsPerPage)}/>
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
                                <Form.Group className="mb-3" controlid="form.ControlRole">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control required type="text" value={rolePermission?.role?.nombre || ''} onChange={e => onChangeInput("nombre", e.target.value)} placeholder="Administrador" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlid="form.ControlDescriptionRole">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control as="textarea" type="text" value={rolePermission?.role?.descripcion || ''} onChange={e => onChangeInput("descripcion", e.target.value)} placeholder="Usuario que administra la aplicación" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Permisos de Usuarios</Form.Label>
                            </Col>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlid="form.ControlPermissionWhatchUser">
                                        <Form.Check
                                            className="checkbox-glaucous"
                                            inline
                                            label="Ver"
                                            name="group1"
                                            checked={rolePermission?.permission?.puede_ver_usuarios === 1 ? true : false}
                                            onChange={(e) => e.currentTarget.checked ? onChangeChecked("puede_ver_usuarios", 1) : onChangeChecked("puede_ver_usuarios", 0)}
                                            type="checkbox"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlid="form.ControlPermissionEditUser">
                                        <Form.Check
                                            className="checkbox-dark-spring-green"
                                            inline
                                            label="Editar"
                                            name="group1"
                                            checked={rolePermission?.permission?.puede_editar_usuarios === 1 ? true : false}
                                            onChange={(e) => e.currentTarget.checked ? onChangeChecked("puede_editar_usuarios", 1) : onChangeChecked("puede_editar_usuarios", 0)}
                                            type="checkbox"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlid="form.ControlPermissionDeleteUser">
                                        <Form.Check
                                            className="checkbox-rust"
                                            inline
                                            label="Eliminar"
                                            name="group1"
                                            checked={rolePermission?.permission?.puede_eliminar_usuarios === 1 ? true : false}
                                            onChange={(e) => e.currentTarget.checked ? onChangeChecked("puede_eliminar_usuarios", 1) : onChangeChecked("puede_eliminar_usuarios", 0)}
                                            type="checkbox"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Permisos de Proyectos</Form.Label>
                            </Col>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlid="form.ControlPermissionCreateProyect">
                                        <Form.Check
                                            className="checkbox-purpureus"
                                            inline
                                            label="Agregar"
                                            name="group1"
                                            checked={rolePermission?.permission?.puede_crear_proyectos === 1 ? true : false}
                                            onChange={(e) => e.currentTarget.checked ? onChangeChecked("puede_crear_proyectos", 1) : onChangeChecked("puede_crear_proyectos", 0)}
                                            type="checkbox"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlid="form.ControlPermissionEditProyect">
                                        <Form.Check
                                            className="checkbox-dark-spring-green"
                                            inline
                                            label="Editar"
                                            name="group1"
                                            checked={rolePermission?.permission?.puede_editar_proyectos === 1 ? true : false}
                                            onChange={(e) => e.currentTarget.checked ? onChangeChecked("puede_editar_proyectos", 1) : onChangeChecked("puede_editar_proyectos", 0)}
                                            type="checkbox"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlid="form.ControlPermissionDeleteProyect">
                                        <Form.Check
                                            className="checkbox-rust"
                                            inline
                                            label="Eliminar"
                                            name="group1"
                                            checked={rolePermission?.permission?.puede_eliminar_proyectos === 1 ? true : false}
                                            onChange={(e) => e.currentTarget.checked ? onChangeChecked("puede_eliminar_proyectos", 1) : onChangeChecked("puede_eliminar_proyectos", 0)}
                                            type="checkbox"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Permisos de Tareas</Form.Label>
                            </Col>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlid="form.ControlPermissionCreateTask">
                                        <Form.Check
                                            className="checkbox-purpureus"
                                            inline
                                            label="Agregar"
                                            name="group1"
                                            checked={rolePermission?.permission?.puede_crear_tareas === 1 ? true : false}
                                            onChange={(e) => e.currentTarget.checked ? onChangeChecked("puede_crear_tareas", 1) : onChangeChecked("puede_crear_tareas", 0)}
                                            type="checkbox"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlid="form.ControlPermissionEditTask">
                                        <Form.Check
                                            className="checkbox-dark-spring-green"
                                            inline
                                            label="Editar"
                                            name="group1"
                                            checked={rolePermission?.permission?.puede_editar_tareas === 1 ? true : false}
                                            onChange={(e) => e.currentTarget.checked ? onChangeChecked("puede_editar_tareas", 1) : onChangeChecked("puede_editar_tareas", 0)}
                                            type="checkbox"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlid="form.ControlPermissionDeleteTask">
                                        <Form.Check
                                            className="checkbox-rust"
                                            inline
                                            label="Eliminar"
                                            name="group1"
                                            checked={rolePermission?.permission?.puede_eliminar_tareas === 1 ? true : false}
                                            onChange={(e) => e.currentTarget.checked ? onChangeChecked("puede_eliminar_tareas", 1) : onChangeChecked("puede_eliminar_tareas", 0)}
                                            type="checkbox"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Permisos de Reportes</Form.Label>
                            </Col>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlid="form.ControlWatchReports">
                                        <Form.Check
                                            className="checkbox-glaucous"
                                            inline
                                            label="Ver"
                                            name="group1"
                                            checked={rolePermission?.permission?.puede_ver_reportes === 1 ? true : false}
                                            onChange={(e) => e.currentTarget.checked ? onChangeChecked("puede_ver_reportes", 1) : onChangeChecked("puede_ver_reportes", 0)}
                                            type="checkbox"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="glaucous" onClick={updateRole}>
                        Actualizar
                    </Button>
                    <Button active variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
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

export default Roles;