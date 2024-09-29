import { Badge, Button, Card, Container, Modal, Pagination, ProgressBar, Table } from "react-bootstrap";
import NavbarCustom from "../components/navbar";
import { useState } from "react";

function Home() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
            <NavbarCustom></NavbarCustom>
            <Container fluid>
                <h1 className="py-3 text-black">Proyectos</h1>
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
            
        </>
    )
}

export default Home;