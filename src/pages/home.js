import { Badge, Button, Card, Container, Pagination, ProgressBar, Table } from "react-bootstrap";
import NavbarCustom from "../components/navbar";

function Home() {
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
                                    <th>#</th>
                                    <th>Nombre de Proyecto</th>
                                    <th>Miembros</th>
                                    <th>Progreso del Proyecto</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Matando Sirenas</td>
                                    <td>Jorge Gonzalez</td>
                                    <td>
                                        <ProgressBar striped variant="dark-spring-green" now={35} />
                                    </td>
                                    <td>
                                        <Badge bg="rust">En progreso</Badge>
                                    </td>
                                    <td>
                                        <Button variant="rust">
                                            <i className="bi bi-box-arrow-right"></i>
                                        </Button>
                                        <Button variant="dark-spring-green">
                                            <i className="bi bi-box-arrow-right"></i>
                                        </Button>
                                        <Button variant="glaucous">
                                            <i className="bi bi-box-arrow-right"></i>
                                        </Button>
                                        <Button variant="purpureus">
                                            <i className="bi bi-box-arrow-right"></i>
                                        </Button>
                                        <Button variant="turquoise">
                                            <i className="bi bi-box-arrow-right"></i>
                                        </Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Matando Ciclopes</td>
                                    <td>Jorge Gonzalez</td>
                                    <td>
                                        <ProgressBar striped variant="purpureus" now={50} />
                                    </td>
                                    <td>
                                        <Badge bg="rust">En progreso</Badge>
                                    </td>
                                    <td>
                                        <Button variant="rust">
                                            <i className="bi bi-box-arrow-right"></i>
                                        </Button>
                                        <Button variant="dark-spring-green">
                                            <i className="bi bi-box-arrow-right"></i>
                                        </Button>
                                        <Button variant="glaucous">
                                            <i className="bi bi-box-arrow-right"></i>
                                        </Button>
                                        <Button variant="purpureus">
                                            <i className="bi bi-box-arrow-right"></i>
                                        </Button>
                                        <Button variant="turquoise">
                                            <i className="bi bi-box-arrow-right"></i>
                                        </Button>
                                    </td>
                                </tr>
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
            
            
        </>
    )
}

export default Home;