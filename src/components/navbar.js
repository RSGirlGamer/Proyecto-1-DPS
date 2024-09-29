import { Button, Container, Nav, Navbar } from "react-bootstrap";

function NavbarCustom() {
    return(
        <Navbar expand="lg" bg="light">
            <Container>
                <Nav>
                    <Nav.Link href="/proyects">Proyectos</Nav.Link>
                    <Nav.Link href="/users">Usuarios</Nav.Link>
                </Nav>
                <Button variant="glaucous">
                    <i className="bi bi-box-arrow-right"></i>
                </Button>
            </Container>
        </Navbar>
    )
}


export default NavbarCustom;