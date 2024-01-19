import React, { useState, useEffect } from 'react';
import {
  Button, Form, Row, Col, Container, Navbar, Nav, ListGroup, NavDropdown, ButtonGroup, FormLabel, Table
} from 'react-bootstrap';
import LogOut from '../../services/LogOut';
import { useLocalState } from '../../util/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AddRooms = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const navigate = useNavigate(-1);





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





 // zavrsetak navigacije



  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    description: '',
  });
  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);
  const [existingRooms, setExistingRooms] = useState([]);
  const [trenutnistatus, setTrenutniStatus] = useState('active');

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
      maxRoomCapacity: formData.capacity,
      status: formData.description,
    };



    try {
      const response = await fetch('http://localhost:8080/api/v1/func/administration/add/room', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        mode: "cors",
      });

      if (response.ok) {
        const newRoom = await response.json();
        setExistingRooms((prevRooms) => [...prevRooms, newRoom]);
        setAddSuccess(true);
        window.location.reload();
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




  const handleFixRoom = async (roomId, Roomstatus) => {
    try {
      console.log(roomId + "  " + Roomstatus);

      const response = await fetch(`http://localhost:8080/api/v1/func/administration/change-room-status`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        mode: "cors",
        body: JSON.stringify({
          name: roomId,
          status: Roomstatus
        }),
      });


      if (response.ok) {
        setTrenutniStatus("active");
        window.location.reload();
        console.log(trenutnistatus);
        console.log(`Initiated repair for room with ID: ${roomId}`);
      } else {
        setTrenutniStatus("inactive");
        console.error(trenutnistatus);
        console.error(`Error initiating repair for room with ID ${roomId}: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error initiating repair for room with ID ${roomId}: ${error.message}`);
    }
  };



  const handleRepairRoom = async (roomId, Roomstatus) => {
    try {


      const response = await fetch(`http://localhost:8080/api/v1/func/administration/change-room-status`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        mode: "cors",
        body: JSON.stringify({
          name: roomId,
          status: Roomstatus
        }),
      });


      if (response.ok) {
        setTrenutniStatus("inactive");
        window.location.reload();
        console.log(trenutnistatus);
        console.log(`Initiated repair for room with ID: ${roomId}`);
      } else {
        setTrenutniStatus("active");
        console.error(trenutnistatus);
        console.error(`Error initiating repair for room with ID ${roomId}: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error initiating repair for room with ID ${roomId}: ${error.message}`);
    }
  };


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


  console.log(existingRooms);

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
              <Navbar.Brand className='pageName'>Upravljanje Sobama</Navbar.Brand>
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
            <Form.Group controlId="validationCustomDescription">
              <Form.Label>Status sobe</Form.Label>
              <Form.Select
                name="description"
                value={formData.description}
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
          <FormLabel as="h3">POSTOJEĆE SOBE</FormLabel>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center">Ime sobe</th>
                <th className="text-center">Popunjenost sobe</th>
                <th className="text-center">Kapacitet sobe</th>
                <th className="text-center">Status sobe</th>
                <th className="text-center">Promijeni status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.slice().sort((a, b) => a.name.localeCompare(b.name)).map((room) => (
                <tr key={room.id}>
                  <td className="text-center">{room.name}</td>
                  <td className="text-center">{room.capacity}</td>
                  <td className="text-center">{room.maxRoomCapacity}</td>
                  <td className="text-center">{room.roomStatus === 'active' ? 'Aktivna' : 'Neaktivna'}</td>
                  <td className="text-center">
                    {room.roomStatus === 'active' ? (
                      <Button
                        variant="danger"
                        className="ml-2"
                        onClick={() => handleRepairRoom(room.name, 'inactive')}
                      >
                        ONESPOSOBI
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        className="ml-2"
                        onClick={() => handleFixRoom(room.name, 'active')}
                      >
                        OSPOSOBI
                      </Button>
                    )}
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

export default AddRooms;