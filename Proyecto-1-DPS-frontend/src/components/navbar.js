import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useAuth } from "../services/auth_provider";
import { useQuery } from "react-query";
import { getPermissionsAuth } from "../services/api";
import { jwtDecode } from "jwt-decode";

function NavbarCustom() {

    const auth = useAuth()
    const user = jwtDecode(auth.token)

    const {data: permission, isSuccess} = useQuery(["rolesAuth", {user_id: user.id}], () => getPermissionsAuth(user.id), {
        enabled: user != null
    })

    if(isSuccess) {
        return(
            <Navbar expand="lg" bg="light">
                <Container>
                    <Nav>
                        <Nav.Link href="/projects">Proyectos</Nav.Link>
                        {permission?.puede_ver_usuarios === 1 ? (
                            <>
                                <Nav.Link href="/users">Usuarios</Nav.Link>
                                <Nav.Link href="/roles">Roles</Nav.Link>
                            </>
                            
                        ) : <></>}
                    </Nav>
                    <Button onClick={auth.logOut} variant="glaucous">
                        <i className="bi bi-box-arrow-right"></i>
                    </Button>
                </Container>
            </Navbar>
        )
    }
    
}


export default NavbarCustom;