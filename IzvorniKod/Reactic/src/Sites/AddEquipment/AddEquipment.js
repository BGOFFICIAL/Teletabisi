import React, { useState, useEffect } from 'react';
import {
  Button, Form, Row, Col, Container, Navbar, Nav, ListGroup, NavDropdown, Table, Dropdown,
} from 'react-bootstrap';

import LogOut from '../../services/LogOut';
import { useLocalState } from '../../util/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const AddEquipment = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");




//navigacija



const Admin="ADMIN";
const AdminEmployee="ADMINEMPLOYEE";
let rolepriv="";

if (jwt) {
    console.log(jwt);
    const decoded = jwtDecode(jwt);
    const role = decoded.roles;

    if (role && role.length > 0) {

      localStorage.setItem("roles", role[0]);





      rolepriv = localStorage.getItem("roles");

      console.log("Role:" + rolepriv);
     
    }}





    if(rolepriv!==Admin && rolepriv!==AdminEmployee){
    
        LogOut();

    }




//zavrsetak navigacije











  
  const navigate = useNavigate();
  const [existingRooms, setExistingRooms] = useState([]);


  /* if(localStorage.getItem("roles")!=="ADMIN"){
       window.location.href="/welcome";
   }*/


  const [formData, setFormData] = useState({
    name: '',
    status: '',
    description: '',
    roomName: '',
  });
  const [addError, setAddError] = useState('');
  const [ChangeSuccess, setAChangeSuccess] = useState(false);
  const [ChangeError, setChangeError] = useState('');
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
      status: formData.status,
      description: formData.description,
      roomName: formData.roomName
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/func/administration/add/equipment", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        mode: "cors",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newEquipment = await response.json();
        setExistingEquipment((prevEquipment) => [...prevEquipment, newEquipment]);
        setAddSuccess(true);

        window.location.reload();
      } else {
        alert("Popunjen kapacitet");
        setAddError("Error adding equipment");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error adding equipment:", error.message);
      setAddError("Error adding equipment");
    }
  };


  const handleChangeEquipmentRoom = async (equipmentId, nameofroom) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/func/administration/change-equipment-room/${equipmentId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        mode: "cors",
        body: JSON.stringify({
          roomName: nameofroom,
        }),
      });
      if (response.ok) {
        console.log(`Initiate change of rooms for equipment with ID: ${equipmentId}`);
        setAChangeSuccess(true);
        window.location.reload();
      } else {
        alert("Popunjen kapacitet");
        setChangeError("Error changing equipment room");
        console.error(`Error initiating change of room for equipment with ID ${equipmentId}: ${response.status}`);
        window.location.reload();
      }

    } catch (error) {
      setChangeError(false);
      setChangeError("Error changing equipment room");
      console.error(`Error initiating change of room for equipment with ID ${equipmentId}: ${error.message}`);
    }
  };




  const handleDeleteEquipment = async (equipmentId) => {
    try {
      const response = await fetch(`api url for deleting equpment/${equipmentId}`, {
        method: 'DELETE',
        mode: "cors",
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

  const handleRepairEquipment = async (equipmentId, Roomstatus) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/func/administration/change-equipment-status/${equipmentId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        mode: "cors",
        body: JSON.stringify({
          status: Roomstatus,
        }),
      });
      if (response.ok) {
        window.location.reload();
        console.log(`Initiate repair for equipment with ID: ${equipmentId}`);

      } else {
        console.error(`Error initiating repair for equipment with ID ${equipmentId}: ${response.status}`);
      }



    } catch (error) {
      console.error(`Error initiating repair for equipment with ID ${equipmentId}: ${error.message}`);
    }
  };



  const handleFixEquipment = async (equipmentId, Roomstatus) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/func/administration/change-equipment-status/${equipmentId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        mode: "cors",
        body: JSON.stringify({
          status: Roomstatus,
        }),
      });
      if (response.ok) {
        window.location.reload();
        console.log(`Initiate repair for equipment with ID: ${equipmentId}`);

      } else {

        console.error(`Error initiating repair for equipment with ID ${equipmentId}: ${response.status}`);
      }



    } catch (error) {
      console.error(`Error initiating repair for equipment with ID ${equipmentId}: ${error.message}`);
    }
  };


  useEffect(() => {

    fetch('http://localhost:8080/api/v1/func/administration/all-equipment', {
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      mode: "cors",
      method: 'GET',
    })
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

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/func/administration/all-rooms', {
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      mode: "cors",
      method: 'GET',



    })
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

  const filteredEquipment = existingEquipment.filter((equipment) => equipment.id !== 0);
  const filteredRooms = existingRooms.filter((room) => room.id !== 0);


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
              <Navbar.Brand className='pageName'>Upravljanje Opremom</Navbar.Brand>
            </Navbar.Collapse>
          </Col>
          <Col xs={1}>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <NavDropdown title="Opcije" id="basic-nav-dropdown" className="bigBoldText">
                  <NavDropdown.Item onClick={() => navigate(-1)}>Povratak</NavDropdown.Item>
                  <NavDropdown.Divider />
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
            <Form.Group controlId="validationCustomDescription">
              <Form.Label>Status opreme</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Odaberi status</option>
                <option value="active">Aktivna</option>
                <option value="inactive">Neaktivna</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={6}>
            <Form.Group md="3" controlId="validationCustomDescription">
              <Form.Label>Odaberi prostoriju</Form.Label>
              <Form.Select
                name="roomName"
                value={formData.roomName}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Odaberi prostoriju</option>
                {filteredRooms.map((room) => (
                  <option key={room.id} value={room.name}>
                    {room.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={6}>
            {addError && <div style={{ color: 'red' }}>{addError}</div>}
            {addSuccess && <div style={{ color: 'green' }}>Oprema uspješno dodana!</div>}
            {ChangeError && <div style={{ color: 'red' }}>{ChangeError}</div>}
            {ChangeSuccess && <div style={{ color: 'green' }}>Oprema uspješno promijenjena!</div>}

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

      <br /> <br />


      <Row className="justify-content-md-center">
        <Col xs={12}>
          <h3>POSTOJEĆA OPREMA</h3>
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>Naziv opreme</th>
                <th>Lokacija</th>
                <th>Status opreme</th>
                <th>Promijeni status</th>
                <th>Promijeni lokaciju</th>
              </tr>
            </thead>
            <tbody>
              {filteredEquipment.slice().sort((a, b) => a.name.localeCompare(b.name)).map((equipment) => (
                <tr key={equipment.id}>
                  <td>{equipment.name}</td>
                  <td>{equipment.room.name}</td>
                  <td>{equipment.status === 'active' ? 'Aktivna' : 'Neaktivna'}</td>
                  <td>

                    {equipment.status === 'inactive' && (
                      <Button
                        variant="primary"
                        className="ml-2"
                        onClick={() => handleFixEquipment(equipment.id, 'active')}
                      >
                        OSPOSOBI
                      </Button>
                    )}


                    {equipment.status === 'active' && (
                      <Button
                        variant="danger"
                        className="ml-2"
                        onClick={() => handleRepairEquipment(equipment.id, 'inactive')}
                      >
                        ONESPOSOBI
                      </Button>
                    )}
                  </td>
                  <td>
                    <Dropdown className="ml-2">
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        PROMIJENI
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {filteredRooms.map((room) => (
                          <Dropdown.Item
                            key={room.id}
                            onClick={() => handleChangeEquipmentRoom(equipment.id, room.name)}
                          >
                            {room.name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default AddEquipment;