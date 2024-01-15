import { Col, Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

import { useLocalState } from "../../util/useLocalStorage";
import { jwtDecode } from "jwt-decode";
import LogOut from "../../services/LogOut";
import {Navigation,Waiter} from "../../services/navigate";

const Employee = () => {
  Waiter(window.location.pathname);
  const [jwt, setJwt] = useLocalState("", "jwt");
  Navigation();

  

  return (
    <Container className="justify-content-md-center">
      <Navbar bg="dark" data-bs-theme="dark" fixed="top">
        <Container>
          <Col xs={1}>
            <Navbar.Brand href="#">
              <img
                src="/logofr.jpeg"
                width="150"
                height="75"
                className="d-inline-block align-items-start rounded"
                alt="logo"
              />
            </Navbar.Brand>
          </Col>
          <Col xs={8}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-center"
            >
              <Navbar.Brand>Djelatnik</Navbar.Brand>
            </Navbar.Collapse>
          </Col>
          <Col xs={1}>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <NavDropdown title="Opcije" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/settings">Postavke</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => LogOut()}>
                    Odjavi se
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Container>
      </Navbar>
    </Container>
  );
};
export default Employee;
