import React from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Container,
  Navbar,
  Nav,
  Card,
  InputGroup,
  ButtonGroup,
  FormLabel,
  ToggleButton,
  ToggleButtonGroup,
  NavbarText,
} from "react-bootstrap";
import "./welcome.css";
import { useLocalState, useEffect } from "../../util/useLocalStorage";
import { jwtDecode } from "jwt-decode";
import { LogOut } from "../../services/LogOut";
import {Navigation} from "../../services/navigate";

const Welcome = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");

  



  const stil = {
    fontSize: "28px",
    fontWeight: "bold",
  };

  return (
    <Container>
      <Row>
        <Navbar bg="dark" data-bs-theme="dark" fixed="top">
          <Container className="justify-content-space-between">
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
                <Navbar.Brand style={stil}>
                  Dobrodošli u rehabilitacijski centar
                </Navbar.Brand>
              </Navbar.Collapse>
            </Col>
            <Col xs={1}>
              <Navbar.Collapse className="justify-content-end">
                <Nav></Nav>
              </Navbar.Collapse>
            </Col>
          </Container>
        </Navbar>
      </Row>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Row className="justify-content-center">
        <Card style={{ width: "55rem" }}>
          <Card.Body className="text-center">
            <Card.Title>Zahvaljujemo što ste odabrali naš centar</Card.Title>
            <Card.Text>
              Kako biste koristili naše usluge, potrebno se prijaviti. Ako
              nemate račun, registrirajte se.
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => (window.location.href = "/login")}
            >
              Prijava
            </Button>{" "}
            <Button
              variant="primary"
              onClick={() => (window.location.href = "/register")}
            >
              Registracija
            </Button>
          </Card.Body>
        </Card>
      </Row>
    </Container>

    /*
      <div className="container-fluid">
    
    <div className="row row-highlight">
      <div className="col">
        
        <img src="path/to/your/logo.png" alt="Logo" className="logo" />
      </div>
      <div className="col-5"></div>
      <div className="col-3 col-text">
        <h3>Jwt is {jwt}</h3>
      </div>
      <div className="col"></div>
    </div>

    
    <div className="row row-background">
      <div className="col-3 col-text">
        <h3>Thank you for choosing us</h3>
      </div>
      <div className="col-5"></div>
      <div className="col-3"></div>
    </div>

    
    <div className="row row-background">
      <div className="col-3 col-text">
       
        <p>Description of our app goes here.</p>
      </div>
      <div className="col-5"></div>
      <div className="col-3"></div>
    </div>

    
    <div className="row row-background">
      <div className="col-2"></div>
      <div className="col-3">
      
        <button className="btn btn-primary btn-register">Register</button>
      </div>
      <div className="col-2"></div>
    </div>

    
    <div className="row row-highlight">
      <div className="col"></div>
      <div className="col-5"></div>
      <div className="col-3">
        
        <button className="btn btn-primary btn-login">Login</button>
      </div>
      <div className="col"></div>
    </div>
  </div>
*/
  );
};

export default Welcome;
