import React, { useState } from 'react';
import {
  Button, Form, Row, Col, Container, Navbar, Nav
} from 'react-bootstrap';
import axios from "axios";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const sendResetRequest = (e) => {
      e.preventDefault();

      const data = {
         email: email,
      };

      axios.post("forgot", data).then(
         (res) => {
            console.log(res)
            setResetSuccess(true);
         }
      ).catch(
         (err) => {
            console.log(err)
            setResetError("Email NIJE uspješno poslan");
         }
      )
      
  };

  return (
   


    <Container className="justify-content-md-center">
      <Navbar bg="dark" data-bs-theme="dark" fixed="top">
        {/* Navbar content */}
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
              <Navbar.Brand>Prijava</Navbar.Brand>
            </Navbar.Collapse>
          </Col>

          <Col xs={1}>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Button variant="outline-primary" onClick={() => window.location.href = "/welcome"}>Povratak</Button>
              </Nav>
            </Navbar.Collapse>
          </Col>

        </Container>
      </Navbar>

      <br /><br /><br /><br /><br /><br /><br /><br />

      <Form noValidate>
         <Row className="justify-content-md-center">
            <Col xs={6}>
               <Form.Group md="3" controlId="validationCustomEmail">
               <Form.Label>Email adresa</Form.Label>
               <Form.Control
                  type="email"
                  placeholder="Upišite Vašu email adresu ovdje"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
               />
               </Form.Group>
            </Col>
         </Row>
         <Row className="justify-content-md-center">
            <Col xs={6}>
               {resetError && <div style={{ color: 'red' }}>{resetError}</div>}
               {resetSuccess && <div style={{ color: 'green' }}>Email za promjenu šifre uspješno poslan!</div>}
            </Col>
         </Row>
         <Row className="justify-content-md-center">
            <Col xs={12} className="d-flex justify-content-center"> {/* Added the 'd-flex' and 'justify-content-center' classes */}
               <Button
                  className="mb-3"
                  onClick={sendResetRequest}
                  style={{ marginTop: '20px' }}
                  >Pošalji email</Button>
            </Col>
         </Row>
      </Form>

    </Container>
  );
};

export default ForgotPassword;


