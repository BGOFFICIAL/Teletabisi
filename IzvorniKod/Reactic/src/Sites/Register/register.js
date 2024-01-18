import React from "react";
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
import DatePicker from "react-datepicker";
import { jwtDecode } from "jwt-decode";
import { useLocalState } from "../../util/useLocalStorage";
import { useState } from "react";
import Navigacija from "../../services/navigate";
import { useNavigate } from "react-router-dom";



const Register = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [validated, setValidated] = useState(false);
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [email, setEmail] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [kime, setKime] = useState("");
  const [dob, setDob] = useState(null);
  const [oib, setOib] = useState("");
  const [spol, setSpol] = useState("");

  Navigacija(jwt);



  const handleName = (event) => {
    const Newname = event.target.value;
    const isValidName = Newname.length >= 0 && Newname.trim() !== "";
    setIme(Newname);
    setValidated(isValidName);
  };

  const handlesurName = (event) => {
    const Newsurname = event.target.value;
    const isValidsurName = Newsurname.length >= 0 && Newsurname.trim() !== "";
    setPrezime(Newsurname);
    setValidated(isValidsurName);
  };

  const handlePasswordChange = (event) => {
    const novaLozinka = event.target.value;
    const isValidPassword =
      novaLozinka.length >= 8 &&
      novaLozinka.length <= 20 &&
      novaLozinka.trim() !== "";
    setLozinka(novaLozinka);
    setValidated(isValidPassword);
  };

  const handleKName = (event) => {
    const NewKname = event.target.value;
    const isValidKName = NewKname.length >= 0 && NewKname.trim() !== "";
    setKime(NewKname);
    setValidated(isValidKName);
  };

  const handleDateChange = (date) => {
    setDob(date);
    setValidated(false);
  };

  const handleOibChange = (e) => {
    setOib(e.target.value);
    setValidated(false);
  };

  const isValidOIB = (oib) => {
    const oibRegex = /^\d{11}$/;
    return oibRegex.test(oib);
  };

  const handleGenderChange = (e) => {
    setSpol(e.target.value);
    setValidated(false);
  };

  let pom2 = false;

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (
      ime.trim() === "" ||
      prezime.trim() === "" ||
      email.trim() === "" ||
      lozinka.trim() === "" ||
      kime.trim() === "" ||
      dob === null ||
      spol === "" ||
      !isValidOIB(oib) ||
      lozinka.length <= 7 ||
      lozinka.length >= 21
    ) {
      setValidated(true);
      return;
    }

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formData = {
        firstname: ime,
        lastname: prezime,
        email: email,
        password: lozinka,
        username: kime,
        gender: spol,
        dateOfBirth: dob,
        oib: oib,
      };
      const jsonData = JSON.stringify(formData);
      console.log("Krenuli sa slanjem" + jsonData);

      try {
        pom2 = false;

        fetch("http://localhost:8080/api/v1/auth/register", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: jsonData,
        })
          .then((response) => {
            if (response.status === 200) {
              pom2 = true;
              return response.json();
            } else {
              return Promise.reject("Nije prava osoba u našoj bazi");
            }
          })
          .then((data) => {
            if (pom2 === true) {
              window.location.href = "/login";
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        setValidated(true);
      } catch (error) {
        return Promise.reject("Invalidna registracija");
      }
    }
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
.bigBoldText {
    font-size: 20px;
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
              <Navbar.Brand className='pageName'>Registracija</Navbar.Brand>
            </Navbar.Collapse>
          </Col>

          <Col xs={1}>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Button variant="light"
                  onClick={() => window.location.href = "/welcome"}>Povratak </Button>
              </Nav>
            </Navbar.Collapse>
          </Col>

        </Container>
      </Navbar>
      <br /><br /><br /><br /><br /><br /><br />

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="justify-content-md-center">
          <Col xs={3}>
            <Form.Group md="4" controlId="validationCustom01">
              <Form.Label>Ime</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Ime"
                onChange={handleName}
                isValid={false}
              />

              <Form.Control.Feedback type="invalid">
                Molimo unesite ime.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={3}>
            <Form.Group md="4" controlId="validationCustom02">
              <Form.Label>Prezime</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Prezime"
                onChange={handlesurName}
                isValid={false}
              />

              <Form.Control.Feedback type="invalid">
                Molimo unesite prezime.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col xs={3}>
            <Form.Group md="6" controlId="validationCustom03">
              <Form.Label>OIB</Form.Label>
              <Form.Control
                type="text"
                placeholder="OIB"
                required
                value={oib}
                onChange={handleOibChange}
                isInvalid={validated && !isValidOIB(oib)}
                isValid={validated && isValidOIB(oib)}
                aria-describedby="uputeOib"
              />

              <Form.Control.Feedback type="invalid">
                Molimo unesite ispravan OIB.
              </Form.Control.Feedback>
              <Form.Text id="uputeOib" muted>
                OIB mora sadžavati točno 11 znamenaka.
              </Form.Text>
            </Form.Group>
          </Col>
          <Col xs={3}>
            <Form.Group md="3" controlId="validationCustom06">
              <Form.Label>Korisničko ime</Form.Label>
              <Form.Control
                type="text"
                placeholder="Korisničko ime"
                onChange={handleKName}
                isValid={false}
                required
              />

              <Form.Control.Feedback type="invalid">
                Molimo unesite korisničko ime.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col xs={6}>
            <Form.Group md="3" controlId="validationCustom04">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Form.Control.Feedback type="invalid">
                Molimo unesite ispravan email.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col xs={6}>
            <Form.Group md="3" controlId="validationCustom05">
              <Form.Label>Lozinka</Form.Label>
              <Form.Control
                type="password"
                placeholder="Lozinka"
                required
                value={lozinka}
                onChange={handlePasswordChange}
                aria-describedby="upute"
                isValid={false}
              />
              <Form.Text id="upute" muted>
                Vaša lozinka mora biti duga 8-20 znakova i ne smije sadžavati
                razmake.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Molimo unesite ispravnu lozinku.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={3}>
            <br />
            <Form.Group className="mb-3">
              <Form.Label>Spol</Form.Label>
              <div>
                <Form.Check
                  inline
                  required
                  label="Muško"
                  name="gender"
                  type="radio"
                  id="gender-male"
                  value="muško"
                  checked={spol === "muško"}
                  onChange={handleGenderChange}
                  isInvalid={validated && spol === ""}
                />
                <Form.Check
                  inline
                  required
                  label="Žensko"
                  name="gender"
                  type="radio"
                  id="gender-female"
                  value="žensko"
                  checked={spol === "žensko"}
                  onChange={handleGenderChange}
                  isInvalid={validated && spol === ""}
                />
              </div>
              <Form.Control.Feedback type="invalid">
                Molimo odaberite spol.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={3}>
            <br />
            <Form.Group className="mb-3" controlId="dob">
              <Form.Label>Datum rođenja</Form.Label>
              <br />
              <DatePicker
                required
                selected={dob}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                isClearable
                placeholderText="Odaberite datum rođenja"
              />
            </Form.Group>
          </Col>
        </Row>

        <br />
        <br />
        <br />
        <Row className="justify-content-md-center">
          <Col xs={2}>
            <Button className="mb-3" type="submit">
              Registriraj se
            </Button>
          </Col>
        </Row>
      </Form>
      <br />
      <br />
      <br />
      <Row className="text-end">
        <p>
          Već ste registrirani? Kliknite <a href="/login">ovdje.</a>
        </p>
      </Row>
    </Container>
  );
};

export default Register;