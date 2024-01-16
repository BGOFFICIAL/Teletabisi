import React from 'react';
import { useLocalState } from "../../util/useLocalStorage";
import { useEffect, useState } from 'react';
import LogOut from "../../services/LogOut";
import Settings from "../Settings/settings";
import {
  Button, Form, Row, Col, Container, Navbar, Nav,
  InputGroup, ButtonGroup, FormLabel, ToggleButton,
  ToggleButtonGroup, NavbarText
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Mail = () => {

  const navig = useNavigate();
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");
  const [reason, setReason] = useState("");


  function sendMail() {
    const isValidEmailFormat = /^\S+@\S+$/.test(mail);

    if (
      isValidEmailFormat &&
      !reason.includes(' ') && reason.length > 0 &&
      !message.includes(' ') && message.length > 0
    ) {


      const reqBody = {
        "mail": mail,
        "reason": reason,
        "message": message
      };

      console.log(reqBody);

      setMail("");
      setMessage("");
      setReason("");
      alert("Poruka uspješno poslana");
    }

    else {
      alert('Pogrešan unos podataka.');

    }




    /*
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
              //  setJwt(data.token);
              window.location.href = "/user";
            }
          }).catch((error) => {
            console.error("Error:", error);
          });
          */
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


      <Navbar className="purple" fixed="top">
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
              <Navbar.Brand className='pageName'>Mail</Navbar.Brand>
            </Navbar.Collapse>
          </Col>

          <Col xs={1}>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Button variant="light" onClick={() => navig(-1)}>Povratak</Button>
              </Nav>
            </Navbar.Collapse>
          </Col>

        </Container>

      </Navbar>

      <br /><br /><br /><br /><br /><br /><br /><br />

      <Form
        noValidate onSubmit={sendMail}
      >

        <Row className="justify-content-md-center">
          <Col xs={6}>
            <Form.Group md="3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="Upišite email"
                type="email"
                value={mail}
                isInvalid={!mail.includes('@') && !mail.includes(' ') && mail.length > 0}
                isValid={/^\S+@\S+$/.test(mail)}
                onChange={(event) => setMail(event.target.value)}
                required />
              <Form.Control.Feedback type="invalid">
                Molimo unesite ispravan email.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={6}>
            <Form.Group md="3" controlId="opis">
              <Form.Label>Opis</Form.Label>
              <Form.Control
                type="text"
                placeholder="Upišite kratak opis"
                required

                value={reason}
                onChange={(event) => setReason(event.target.value)}

                isValid={!reason.includes(' ') && reason.length > 0}
                isInvalid={reason.includes(' ') && reason.length > 0}
              />

              <Form.Control.Feedback type="invalid">
                Molimo unesite ispravan opis.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col xs={6}>
            <Form.Group md="3" controlId="poruka">
              <Form.Label>Poruka</Form.Label>
              <Form.Control
                as="textarea" rows={5}
                type="text"
                placeholder="Upišite poruku"
                required

                value={message}
                onChange={(event) => setMessage(event.target.value)}

                isValid={!message.includes(' ') && message.length > 0}
                isInvalid={message.includes(' ') && message.length > 0}
              />

              <Form.Control.Feedback type="invalid">
                Molimo unesite ispravnu poruku.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <br />

        <Container className="d-flex justify-content-center">
          <Button
            className="mb-3"
            onClick={sendMail}
          >Pošalji</Button>
        </Container>

      </Form>
    </Container>


  );
};

export default Mail;