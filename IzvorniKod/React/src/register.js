
import { Button, Form, Row, Col, Container, InputGroup } from 'react-bootstrap';
import { useState } from 'react';


function Register() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <Container className="justify-content-md-center">


            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="justify-content-md-center">
                    <Col xs={3}>
                        <Form.Group md="4" controlId="validationCustom01">
                            <Form.Label>Ime</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Ime"
                            />
                            <Form.Control.Feedback type="valid">Ok!</Form.Control.Feedback>
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
                            />
                            <Form.Control.Feedback type="valid">Ok!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Molimo unesite prezime.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>


                </Row>

                <Row className="justify-content-md-center">
                    <Col xs={6}>
                        <Form.Group md="6" controlId="validationCustom03">
                            <Form.Label>OIB</Form.Label>
                            <Form.Control type="text" placeholder="OIB" required />
                            <Form.Control.Feedback type="valid">Ok!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Molimo unesite ispravan OIB.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col xs={6}>
                        <Form.Group md="3" controlId="validationCustom04">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Email" required />
                            <Form.Control.Feedback type="valid">Ok!</Form.Control.Feedback>
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
                            <Form.Control type="password" placeholder="Lozinka" required />
                            <Form.Control.Feedback type="valid">Ok!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Molimo unesite lozinku.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={2}>
                        <Button className="mb-3" type="submit">Registriraj se</Button>
                    </Col>

                </Row>
            </Form>
        </Container >
    );
}

export default Register;
