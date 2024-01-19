import React from "react";
import { jwtDecode } from "jwt-decode";
import { useLocalState } from "../../util/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Container,
  Navbar,
  Nav,
  NavDropdown,
  InputGroup,
  ButtonGroup,
  FormLabel,
  ToggleButton,
  ToggleButtonGroup,
  NavbarText,
} from "react-bootstrap";

import LogOut from "../../services/LogOut";


const Settings = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [CCpassword, setCCPassword] = useState("");
  const [email, setEmail] = useState("");
  const Navigate = useNavigate();

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [loginSource, setLoginSource] = useState("", "loginSource");


  const decoded = jwtDecode(jwt);
  const sub = decoded.sub;



  const handleRemove = async (subic) => {

    console.log(JSON.stringify(subic));

    try {

      const response = await
        fetch("http://localhost:8080/api/v1/func/inactive/remove/all", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,

          },
          mode: 'cors',
          body: JSON.stringify({
            username: subic
          }),
        });
      if (response.ok)
        console.log("Uspješno uklonjen zaposlenik!");
      LogOut();

    } catch (error) {
      console.error('Empty', error);
    }
  };




  function sendSettingsRequest() {

    if (CCpassword !== password) {
      alert("Lozinke se ne podudaraju");
      return;
    }


    const reqBody = {
      username: username,
      password: password,
      email: email,
    };

    if (reqBody.email === "") delete reqBody.email;
    if (reqBody.username === "") delete reqBody.username;
    if (reqBody.password === "") delete reqBody.password;


    fetch("http://localhost:8080/api/v1/auth/update", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Uspješno promijenjeno");
          setCCPassword("");
          setPassword("");
          setEmail("");
          setUsername("");
          return response.json();
        } else {

          return Promise.reject("Invalid username or password");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  }

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
              <Navbar.Brand className='pageName'>Postavke</Navbar.Brand>
            </Navbar.Collapse>
          </Col>

          <Col xs={1}>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <NavDropdown title="Opcije" id="basic-nav-dropdown" className="bigBoldText">
                  <NavDropdown.Item onClick={() => Navigate(-1)}>Povratak</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => LogOut()}>Odjavi se</NavDropdown.Item>


                </NavDropdown>
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
          <Col xs={6}>
            <Form.Group md="3" controlId="validationCustom04">
              <Form.Label>Potvrdi lozinku</Form.Label>
              <Form.Control
                type="password"
                placeholder="Potvrdi lozinku"
                required
                id="CCpassword"
                value={CCpassword}
                onChange={(event) => setCCPassword(event.target.value)}

                isValid={CCpassword.length > 7 && CCpassword.trim().length < 21 && !CCpassword.includes(' ') && CCpassword === password}
                isInvalid={CCpassword.length > 0 && !(CCpassword.length > 7 && CCpassword.trim().length < 21 && !CCpassword.includes(' ')) && CCpassword !== password}
              />

              <Form.Control.Feedback type="invalid">
                Lozinke se ne podudaraju.
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
                required />
              <Form.Control.Feedback type="invalid">
                Molimo unesite ispravan email.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <br /><br /><br />




        <Container className="d-flex flex-column align-items-center justify-content-center position-relative">
          <Button
            className="mb-5 "
            onClick={() => sendSettingsRequest()}
            style={{ width: '10rem' }}
          >
            Promijeni postavke
          </Button>

          <Button
            className="mb-5 "
            variant="danger"
            onClick={() => handleRemove(sub)}
            style={{ width: '10rem' }}
          >Deaktiviraj korisnički račun</Button>

          <Form.Control.Feedback type="valid">
            Uspiješno deaktiviran korisnički račun
          </Form.Control.Feedback>

        </Container>





      </Form>
    </Container>
  );
};

export default Settings;