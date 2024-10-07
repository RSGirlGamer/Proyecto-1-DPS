import { Badge, Button, Card, Col, Container, Form, Modal, Pagination, Row, Spinner, Table, Toast, ToastContainer } from "react-bootstrap";
import NavbarCustom from "../components/navbar";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addProject, deleteProject, getPermissionsAuth, getProjects } from "../services/api";
import DatePickerCustom from "../components/datepicker";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth_provider";
import { jwtDecode } from "jwt-decode";


function Home() {

    const queryClient = useQueryClient()
    const navigate = useNavigate();
    const [toast, setToast] = useState({show: false});
    const [showDelete, setShowDelete] = useState(false);
    const [show, setShow] = useState(false);
    const [project, setProject] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const offset = currentPage * itemsPerPage;

    const auth = useAuth()
    const user = jwtDecode(auth.token)

    // Obtienelos permisos del usuario
    const {data: permission} = useQuery(["rolesAuth", {user_id: user.id}], () => getPermissionsAuth(user.id), {
        enabled: user != null
    })

    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false)
        setShowDelete(false)
        setProject({})
    }

    // Consulta para obtener los proyectos.
    const { data: projects, isLoading } = useQuery('projects', getProjects)

    const saveMutation = useMutation(addProject, {
        onSuccess: () => {
            queryClient.invalidateQueries("projects")
            setToast({type: 'success', header: 'Creado', show: true, message: 'Se ha creado correctamente'})
        },
        onError: (e) => {
            setToast({type: 'danger', header: 'Error', show: true, message: e})
        }
    })

    const deleteMutation = useMutation(deleteProject, {
        onSuccess: () => {
            queryClient.invalidateQueries("projects")
            if(currentPage > 0 && projects.length > 5) {
                setCurrentPage(0)
            }
            setToast({type: 'success', header: 'Eliminado', show: true, message: 'Se ha eliminado correctamente'})
        },
        onError: (e) => {
            setToast({type: 'danger', header: 'Error', show: true, message: e})
        }
    })

    // Crea un nuevo proyecto
    const createProject = () => {
        saveMutation.mutate(project)
        handleClose()
    }

    const showProject = (e) => {
        navigate('/projects/project/' + e.id)
    }

    const showDialogDelete = (e) => {
        setProject(e)
        setShowDelete(true)
    }

    // Elimina un proyecto
    const removeProject = () => {
        deleteMutation.mutate(project?.id)
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
        for(let i = 0; i < Math.ceil(projects?.length / itemsPerPage); i++) {
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
                    <Col>
                        <h1 className="py-3 text-black">Proyectos</h1>
                    </Col>
                    {permission?.puede_crear_proyectos === 1 ? (
                        <>
                            <Col className="col-auto mb-1 align-self-end">
                                <Button variant="glaucous" onClick={handleShow}>
                                    Agregar
                                </Button>
                            </Col>
                        </>
                    ) : <></>}    
                </Row>
                
                <Card bg="white">
                    <Card.Body>
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>Nombre de Proyecto</th>
                                    <th>Descripción</th>
                                    <th>Fecha de Finalización</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects?.map((e, i) => {
                                    if(i >= offset && i < offset + itemsPerPage) {
                                        const colors = ["rust", "turquoise", "dark-spring-green", "purpureus", "glaucous"]
                                        var status;
                                        switch(e.estado) {
                                            case 'Activo':
                                                status = 4
                                                break;
                                            case 'Inactivo':
                                                status = 0
                                                break;
                                            case 'Finalizado':
                                                status = 1
                                                break;
                                            default:
                                                console.log("No existe la prioridad");
                                        }
                                        return(
                                            
                                            <tr key={e.id}>
                                                <td>{e.nombre}</td>
                                                <td>{e.descripcion}</td>
                                                <td>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(new Date(e.fecha_fin))}</td>
                                                <td>
                                                    <Badge bg={colors[status]}>{e.estado}</Badge>
                                                </td>
                                                <td>
                                                    <Container>
                                                        <Row>
                                                            <Col className="col-auto">
                                                                <Button onClick={() => showProject(e)} active variant="glaucous">
                                                                    <i className="bi bi-pencil"></i>
                                                                </Button>
                                                            </Col>
                                                            {permission?.puede_eliminar_proyectos === 1 ? (
                                                                <>
                                                                    <Col className="col-auto">
                                                                        <Button onClick={() => showDialogDelete(e)} active variant="danger">
                                                                            <i className="bi bi-trash"></i>
                                                                        </Button>
                                                                    </Col>
                                                                </>
                                                            ) : <></>}
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
                            <Pagination.Next onClick={nextPage} disabled={currentPage + 1 === Math.ceil(projects?.length / itemsPerPage)}/>
                        </Pagination>
                    </Card.Body>
                </Card>
            </Container>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Añadir</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        Guardar
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlid="form.ControlName">
                                    <Form.Label>Título</Form.Label>
                                    <Form.Control type="text" onChange={e => setProject({...project, nombre: e.target.value})} placeholder="Aniquilar la Sociedad" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlid="form.ControlDescription">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control type="text" onChange={e => setProject({...project, descripcion: e.target.value})} placeholder="Aniquilamos la Sociedad sin Piedad" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <DatePickerCustom label={"Fecha de Inicio"} dateValue={project?.fecha_inicio} onChange={(e) => setProject({...project, fecha_inicio: e})}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <DatePickerCustom label={"Fecha Final"} dateValue={project?.fecha_fin} onChange={(e) => setProject({...project, fecha_fin: e})}/>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="glaucous" onClick={createProject}>
                        Guardar
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
                    <p>¿Deseas Eliminar este Proyecto?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={removeProject} active variant="danger">Aceptar</Button>
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

export default Home;