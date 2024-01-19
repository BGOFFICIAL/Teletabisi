import React, { useState, useEffect } from 'react';
import {
  Button, Form, Row, Col, Container, Navbar, Nav, ListGroup, NavDropdown,
} from 'react-bootstrap';

import  LogOut  from '../../services/LogOut';


const AddEquipment = () => {

    if(localStorage.getItem("roles")!=="ADMIN"){
        window.location.href="/welcome";
    }


  const [formData, setFormData] = useState({
    name: '',
    number: '',
    description: '',
  });
  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);
  const [existingEquipment, setExistingEquipment] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddEquipment = async (e) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      number: formData.number,
      description: formData.description,
    };

    try {
      const response = await fetch('add equipment api url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newEquipment = await response.json();
        setExistingEquipment((prevEquipment) => [...prevEquipment, newEquipment]);
        setAddSuccess(true);
      } else {
        setAddError("Error adding equipment");
      }
    } catch (error) {
      console.error("Error adding equipment:", error.message);
      setAddError("Error adding equipment");
    }
  };

  const handleDeleteEquipment = async (equipmentId) => {
    try {
      const response = await fetch(`api url for deleting equpment/${equipmentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setExistingEquipment((prevEquipment) => prevEquipment.filter(equipment => equipment.id !== equipmentId));
      } else {
        console.error(`Error deleting equipment with ID ${equipmentId}: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error deleting equipment with ID ${equipmentId}: ${error.message}`);
    }
  };

  const handleRepairEquipment = async (equipmentId) => {
    try {
      // dodat logiku za POPRAVAK
      console.log(`Initiate repair for equipment with ID: ${equipmentId}`);
    } catch (error) {
      console.error(`Error initiating repair for equipment with ID ${equipmentId}: ${error.message}`);
    }
  };

  useEffect(() => {

    fetch('api url get all wquipment already in the database')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setExistingEquipment(data);
      })
      .catch(error => {
        console.error('Error fetching existing equipment:', error.message);
      });
  }, []);

  return ( // filipov header i css na vrhu kopirano i prilagodeno
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
 
             .bigBoldText {
               font-size: 20px;
               font-weight: bold;
             }

             .descriptionName{
              font-size: 17px;
              font-weight: 500;
             }
 
             .pageName {
               font-size: 27px;
               font-weight: bold;
             }
 
             .tablica th, .tablica td {
               text-align: center;
               vertical-align: middle;
             }

             .card{
              vertical-align: middle;
             }

             .dateTime{
              width: 900px;
             }
           `}
        </style>
      </>
      <Navbar //NASLOV / HEADER
        className='purple' fixed="top">
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
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
              <Navbar.Brand className='pageName'>Dodaj Opremu</Navbar.Brand>
            </Navbar.Collapse>
          </Col>
          <Col xs={1}>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <NavDropdown title="Opcije" id="basic-nav-dropdown" className="bigBoldText">
                  <NavDropdown.Item onClick={() => window.location.href = "/settings"}>Postavke</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => LogOut()}>Odjavi se</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Container>
      </Navbar>

      <br /><br /><br /><br /><br /><br /><br />
      
      <Form noValidate>
        <Row className="justify-content-md-center">
          <Col xs={6}>
            <Form.Group md="3" controlId="validationCustomName">
              <Form.Label>Naziv opreme</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite naziv opreme"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={6}>
            <Form.Group md="3" controlId="validationCustomNumber">
              <Form.Label>Količina opreme</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite količinu opreme"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={6}>
            <Form.Group md="3" controlId="validationCustomDescription">
              <Form.Label>Opis opreme</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Unesite opis opreme"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={6}>
            {addError && <div style={{ color: 'red' }}>{addError}</div>}
            {addSuccess && <div style={{ color: 'green' }}>Oprema uspješno dodana!</div>}
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={12} className="d-flex justify-content-center">
            <Button
              className="mb-3"
              onClick={handleAddEquipment}
              style={{ marginTop: '20px' }}
            >
              Dodaj opremu
            </Button>
          </Col>
        </Row>
      </Form>
      
      <Row className="justify-content-md-center">
        <Col xs={12}>
          <h3>POSTOJEĆA OPREMA</h3>
          <ListGroup>
            {existingEquipment.map((equipment) => (
              <ListGroup.Item key={equipment.id}>
                {equipment.name} - {equipment.number}
                <Button
                  variant="danger"
                  className="ml-2"
                  onClick={() => handleDeleteEquipment(equipment.id)}
                >
                  UKLONI
                </Button>
                <Button
                  variant="primary"
                  className="ml-2"
                  onClick={() => handleRepairEquipment(equipment.id)}
                >
                  POPRAVAK
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};
export default AddEquipment;