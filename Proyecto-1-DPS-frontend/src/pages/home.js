import { Badge, Button, Card, Col, Container, Form, Modal, Pagination, ProgressBar, Row, Table, Toast, ToastContainer } from "react-bootstrap";
import NavbarCustom from "../components/navbar";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addProject, deleteProject } from "../services/api";
import DatePickerCustom from "../components/datepicker";


function Home() {

    const queryClient = useQueryClient()
    const [toast, setToast] = useState({show: false});
    const [showDelete, setShowDelete] = useState(false);
    const [show, setShow] = useState(false);
    const [project, setProject] = useState({});

    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false)
        setShowDelete(false)
        setProject({})
    }

    const saveMutation = useMutation(addProject, {
        onSuccess: () => {
            // queryClient.invalidateQueries("users")
            setToast({type: 'success', header: 'Creado', show: true, message: 'Se ha creado correctamente'})
        },
        onError: (e) => {
            setToast({type: 'danger', header: 'Error', show: true, message: e})
        }
    })

    const deleteMutation = useMutation(deleteProject, {
        onSuccess: () => {
            // queryClient.invalidateQueries("users")
            setToast({type: 'success', header: 'Eliminado', show: true, message: 'Se ha eliminado correctamente'})
        },
        onError: (e) => {
            setToast({type: 'danger', header: 'Error', show: true, message: e})
        }
    })

    const createProject = () => {
        saveMutation.mutate(project)
        handleClose()
    }

    const removeProject = () => {
        deleteMutation.mutate(project)
        handleClose()
    }

    return(
        <>
            <NavbarCustom></NavbarCustom>
            <Container fluid>
                <Row>
                    <Col>
                        <h1 className="py-3 text-black">Proyectos</h1>
                    </Col>
                    <Col className="col-auto mb-1 align-self-end">
                        <Button variant="glaucous" onClick={handleShow}>
                            Agregar
                        </Button>
                    </Col>
                </Row>
                
                <Card bg="white">
                    <Card.Body>
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>Nombre de Proyecto</th>
                                    <th>Miembros</th>
                                    <th>Fecha de Finalización</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>   
                        </Table>
                        <Pagination className="d-flex justify-content-center pagination-glaucous">
                            <Pagination.Prev />
                            <Pagination.Item active>{1}</Pagination.Item>
                            <Pagination.Item>{2}</Pagination.Item>
                            <Pagination.Next />
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