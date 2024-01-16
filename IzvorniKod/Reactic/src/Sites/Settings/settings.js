import React from "react";
import { jwtDecode } from "jwt-decode";
import { useLocalState } from "../../util/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Container,
  Navbar,
  Nav,
  InputGroup,
  ButtonGroup,
  FormLabel,
  ToggleButton,
  ToggleButtonGroup,
  NavbarText,
} from "react-bootstrap";

const Settings = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const Navigate=useNavigate();

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [loginSource, setLoginSource] = useState("", "loginSource");







 



  console.log(username);
  console.log(password);
  let pom = false;
  console.log("Bearer :" + jwt);

  function sendSettingsRequest() {
    console.log("kliknut");
    const reqBody = {
      username: username,
      password: password,
      email: email,
    };

    if (reqBody.email === "") delete reqBody.email;
    if (reqBody.username === "") delete reqBody.username;
    if (reqBody.password === "") delete reqBody.password;

    console.log("Bearer :" + jwt);

    console.log(reqBody);

    fetch("http://localhost:8080/api/v1/auth/update", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },

      method: "POST",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          console.log("nije usao");
          return Promise.reject("Invalid username or password");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <Container className="justify-content-md-center">
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
              <Navbar.Brand>Postavke</Navbar.Brand>
            </Navbar.Collapse>
          </Col>

          <Col xs={1}>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Button
                  variant="outline-primary"
                  onClick={() => Navigate(-1)}
                >
                  Povratak
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Container>
      </Navbar>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <Form noValidate>
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
                isValid={!username.includes(" ") && username.length > 0}
                isInvalid={username.includes(" ") && username.length > 0}
                required
              />
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
                isValid={
                  password.length > 7 &&
                  password.trim().length < 21 &&
                  !password.includes(" ")
                }
                isInvalid={
                  password.length > 0 &&
                  !(
                    password.length > 7 &&
                    password.trim().length < 21 &&
                    !password.includes(" ")
                  )
                }
              />

              <Form.Control.Feedback type="invalid">
                Molimo unesite ispravnu lozinku.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={6}>
            <Form.Group md="3" controlId="validationCustom03">
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="Email"
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Molimo unesite ispravan email.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <br />
        <br />
        <br />
        <Row className="justify-content-md-center">
          <Col xs={2}>
            <Button className="mb-3" onClick={() => sendSettingsRequest()}>
              Promijeni postavke
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Settings;