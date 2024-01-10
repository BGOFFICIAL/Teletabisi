import React from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { useEffect } from 'react';
import { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { LogOut } from '../services/LogOut';
import {
  Button, Form, Row, Col, Container, Navbar, Nav,
  InputGroup, ButtonGroup, FormLabel, ToggleButton,
  ToggleButtonGroup, NavbarText
} from 'react-bootstrap';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [loginSource, setLoginSource] = useState("", "loginSource");
  const [roles, setRoles] = useLocalState(UseGetRoleFromJWT);


  if (jwt) {
    const decoded = jwtDecode(jwt);
    console.log(decoded.authorities);
    console.log("Ovo vracas:" + decoded.roles[0].authority);
    if (decoded.roles[0].authority === "ADMIN") {
      window.location.href = "/admin";
      return <div>Loading....</div>
    }
    if (decoded.roles[0].authority === "USER") {
      window.location.href = "/user";
      return <div>Loading....</div>
    }
  }

  function UseGetRoleFromJWT() {
    if (jwt) {
      const decoded = jwtDecode(jwt);
      console.log(decoded.authorities);

      return decoded.roles[0].authority;
    }
    else {
      return "";
    }
  }





  console.log(username);
  console.log(password);
  let pom = false;


  function sendLoginRequest() {


    pom = false;

    console.log("kliknut")
    const reqBody = {
      "username": username,
      "password": password,
    };




    fetch("http://localhost:8080/api/v1/auth/authenticate", {
      "headers": {
        "Content-Type": "application/json",
      },
      "method": "POST",

      body: JSON.stringify(reqBody),
    })
      .then(response => {
        if (response.status === 200) {
          pom = true;

          // setLoginSource(true);
          return response.json();

        }
        else {
          console.log("nije usao");
          return Promise.reject("Invalid username or password");

        }
      })
      .then((data) => {
        if (pom === true) {
          console.log("usao", data.token);
          setJwt(data.token);
          window.location.href = "/user";
        }
      }).catch((error) => {
        console.error("Error:", error);
      });
  };





  return (



    <Container className="justify-content-md-center">
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


      <Navbar className="purple" /*bg="dark" data-bs-theme="dark"*/ fixed="top">
        <Container>
          <Col xs={1}>
            <Navbar.Brand href="#">
              <img
                src="/logofr.jpeg"
                className="d-inline-block align-items-start rounded"
                alt="logo"
              />

            </Navbar.Brand>
          </Col>
          <Col xs={8}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
              <Navbar.Brand className='pageName'>Prijava</Navbar.Brand>
            </Navbar.Collapse>
          </Col>

          <Col xs={1}>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Button variant="warning" onClick={() => window.location.href = "/welcome"}>Povratak</Button>
              </Nav>
            </Navbar.Collapse>
          </Col>

        </Container>

      </Navbar>

      <br /><br /><br /><br /><br /><br /><br /><br />

      <Form
        noValidate
      >

        <Row className="justify-content-md-center">
          <Col xs={6}>
            <Form.Group md="3" controlId="validationCustom01">
              <Form.Label>Korisničko ime</Form.Label>
              <Form.Control
                placeholder="Korisničko ime"
                type="username"
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                isValid={!username.includes(' ') && username.length > 0}
                isInvalid={username.includes(' ') && username.length > 0}
                required />
              <Form.Control.Feedback type="invalid">
                Molimo unesite ispravno korisničko ime.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={6}>
            <Form.Group md="3" controlId="validationCustom02">
              <Form.Label>Lozinka</Form.Label>
              <Form.Control
                type="password"
                placeholder="Lozinka"
                required
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}

                isValid={password.length > 7 && password.trim().length < 21 && !password.includes(' ')}
                isInvalid={password.length > 0 && !(password.length > 7 && password.trim().length < 21 && !password.includes(' '))}
              />

              <Form.Control.Feedback type="invalid">
                Molimo unesite ispravnu lozinku.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>



        </Row>
        <Row className="justify-content-md-center">
          <Col xs={3} className="d-flex justify-content-center">
            <Button variant="link" href='#'>
              Zaboravio/la sam lozinku
            </Button>
          </Col>
        </Row>



        <br /><br /><br />

        <Container className="d-flex justify-content-center">
          <Button
            className="mb-3"
            onClick={() => sendLoginRequest()}
          >Prijavi se</Button>
        </Container>

      </Form>
    </Container>


  );
};

export default Login;