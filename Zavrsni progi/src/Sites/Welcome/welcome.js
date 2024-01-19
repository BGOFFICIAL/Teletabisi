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
import Navigacija from "../../services/navigate";
import { useState } from "react";


const Welcome = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");

  if(localStorage.getItem("logouter")!=="true" && localStorage.getItem("logouter")!=="false"){
    localStorage.setItem("logouter","false");
  }

  if(localStorage.getItem("logouter")==="true"){
    //Navigacija(jwt);
  }
  
  if(localStorage.getItem("logouter")==="false"){
    localStorage.setItem("logouter","true");
    localStorage.setItem("jwt","");
    localStorage.setItem("roles","no role");

  }


  return (
    <Container>
      <>
        <style type="text/css">
          {`
    .purple {
      background-color: purple;
      color: white;
    }
    .purple .navbar-brand {
      color: white;
    }

    .purple .navbar-brand img {
      
      width: 150px;
      height: 75px;
    }

    .pageName {
      font-size: 27px;
      font-weight: bold;
    }
    `}
        </style>
      </>

      <Row>
        <Navbar className='purple' fixed="top">

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
              <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                <Navbar.Brand className='pageName'>Dobrodošli u rehabilitacijski centar</Navbar.Brand>
              </Navbar.Collapse>
            </Col>
            <Col xs={1}>
              <Navbar.Collapse className="justify-content-end">
                <Nav>
                </Nav>
              </Navbar.Collapse>
            </Col>
          </Container>
        </Navbar>
      </Row>
      <br /><br /><br /><br /><br /><br /><br /><br />
      <Row className="justify-content-center">
        <Card style={{ width: '55rem' }}>
          <Card.Body className="text-center">
            <Card.Title>Zahvaljujemo što ste odabrali naš centar</Card.Title>
            <Card.Text>
              Kako biste koristili naše usluge, potrebno se prijaviti. Ako nemate račun, registrirajte se.
            </Card.Text>
            <Button variant="primary" onClick={() => window.location.href = "/login"}>Prijava</Button>
            {' '}
            <Button variant="primary" onClick={() => window.location.href = "/register"}>Registracija</Button>
          </Card.Body>
        </Card>
      </Row>
    </Container>


  );
};

export default Welcome;