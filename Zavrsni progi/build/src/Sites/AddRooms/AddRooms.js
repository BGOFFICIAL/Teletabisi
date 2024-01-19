import React, { useState, useEffect } from 'react';
import {
  Button, Form, Row, Col, Container, Navbar, Nav, ListGroup, NavDropdown,
} from 'react-bootstrap';
import  LogOut  from '../../services/LogOut';

const AddRoom = () => {
    if(localStorage.getItem("roles")!=="ADMIN"){
        window.location.href="/welcome";}
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    description: '',
  });
  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);
  const [existingRooms, setExistingRooms] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      capacity: formData.capacity,
      description: formData.description,
    };

    try {
      const response = await fetch('add room api url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newRoom = await response.json();
        setExistingRooms((prevRooms) => [...prevRooms, newRoom]);
        setAddSuccess(true);
      } else {
        setAddError("Error adding room");
      }
    } catch (error) {
      console.error("Error adding room:", error.message);
      setAddError("Error adding room");
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      const response = await fetch(`api url for deleting room/${roomId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setExistingRooms((prevRooms) => prevRooms.filter(room => room.id !== roomId));
      } else {
        console.error(`Error deleting room with ID ${roomId}: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error deleting room with ID ${roomId}: ${error.message}`);
    }
  };

  const handleRepairRoom = async (roomId) => {
   try {
     
     const response = await fetch(`api url for repairing room/${roomId}`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ roomId }),
     });
 
     if (response.ok) {

       console.log(`Initiated repair for room with ID: ${roomId}`);
     } else {
       console.error(`Error initiating repair for room with ID ${roomId}: ${response.status}`);
     }
   } catch (error) {
     console.error(`Error initiating repair for room with ID ${roomId}: ${error.message}`);
   }
 };


  useEffect(() => {
    fetch('api url get all rooms already in the database')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setExistingRooms(data);
      })
      .catch(error => {
        console.error('Error fetching existing rooms:', error.message);
      });
  }, []);

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
      <Navbar className='purple' fixed="top">
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
              <Navbar.Brand className='pageName'>Dodaj Sobe</Navbar.Brand>
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
              <Form.Label>Ime Sobe</Form.Label>
              <Form.Control
                type="text"
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
            <Form.Group md="3" controlId="validationCustomCapacity">
              <Form.Label>Kapacitet Sobe</Form.Label>
              <Form.Control
                type="text"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={6}>
            <Form.Group md="3" controlId="validationCustomDescription">
              <Form.Label>Opis sobe</Form.Label>
              <Form.Control
                as="textarea"
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
            {addSuccess && <div style={{ color: 'green' }}>Soba uspješno dodana!</div>}
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={12} className="d-flex justify-content-center">
            <Button
              className="mb-3"
              onClick={handleAddRoom}
              style={{ marginTop: '20px' }}
            >
              Dodaj sobu
            </Button>
          </Col>
        </Row>
      </Form>

      <Row className="justify-content-md-center">
        <Col xs={12}>
          <h3>POSTOJEĆE SOBE</h3>
          <ListGroup>
            {existingRooms.map((room) => (
              <ListGroup.Item key={room.id}>
                {room.name} - {room.capacity}
                <Button
                  variant="danger"
                  className="ml-2"
                  onClick={() => handleDeleteRoom(room.id)}
                >
                  UKLONI
                </Button>
                <Button
                  variant="primary"
                  className="ml-2"
                  onClick={() => handleRepairRoom(room.id)}
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

export default AddRoom;