import React from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { useEffect, useState } from 'react';
import { LogOut } from '../services/LogOut';
import Settings from '../Settings';
import { jwtDecode } from "jwt-decode";
import {
  Button, Form, Row, Col, Container, Navbar,
  Nav, InputGroup, ButtonGroup, FormLabel, ToggleButton, ToggleButtonGroup,
  NavbarText, NavDropdown, Table, Pagination, Card
} from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';





const User = () => {
  /* const [jwt, setJwt] = useLocalState("", "jwt");
   const [roles, setRoles] = useLocalState(UseGetRoleFromJWT);
   if (jwt) {
     try {
       const decoded = jwtDecode(jwt);
 
       console.log(decoded.authorities);
       console.log("Ovo vracas:" + decoded.roles[0].authority);
       if (decoded.roles[0].authority === "ADMIN") {
         window.location.href = "/admin";
         return <div>Loading....</div>
 
       } else if (decoded.roles[0].authority !== "USER") {
         window.location.href = "/welcome";
         return <div>Loading...</div>
 
       }
     }
     catch (error) {
       window.location.href = "/welcome";
       return <div>Loading....</div>
     }
   }
 
   function UseGetRoleFromJWT() {
     if (jwt) {
       const decoded = jwtDecode(jwt);
       console.log(decoded.authorities);
 
       return decoded.roles[0].authority;
     }
     else {
       return "";
     }
   }
 
   console.log("idem dalje");
 
 */
  const handleButtonClick = (date) => {
    const [day, month, year] = date.split('.');
    const formattedDate = `${month}.${day}.${year}`;
    setSelectedDate(new Date(formattedDate));
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const itemsPerPage = 10;

  const handleDateChange = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}.${month}.${year}.`;
    setSelectedDate(formattedDate);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePageChange2 = (pageNumber) => {
    setCurrentPage2(pageNumber);
  };

  const data1 = Array.from({ length: 17 }, (_, index) => {
    const today = new Date();
    const currentDate = new Date(today.setDate(today.getDate() + index));
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    return {
      id: index + 1,
      appointment: `Termin ${index + 1}`,
      description: `Description ${index + 1}`,
      equipment: `Equipment ${index + 1}`,
      room: `Room ${index + 1}`,
      date: `${day}.${month}.${year}.`,
      time: `11:00`
    };
  });

  const data2 = Array.from({ length: 4 }, (_, index) => {
    const today = new Date();
    const currentDate = new Date(today.setDate(today.getDate() + index));
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    return {
      id: index + 1,
      appointment: `Termin ${index + 1}`,
      description: `Description ${index + 1}`,
      equipment: `Equipment ${index + 1}`,
      room: `Room ${index + 1}`,
      date: `${day}.${month}.${year}.`,
      time: `11:00`
    };
  });



  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data1.slice(indexOfFirstItem, indexOfLastItem);

  const indexOfLastItem2 = currentPage2 * itemsPerPage;
  const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage;
  const currentItems2 = data2.slice(indexOfFirstItem2, indexOfLastItem2);


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
              <Navbar.Brand className='pageName'>Pacijent</Navbar.Brand>
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



      <Container //TABLICA ZAKAZANIH TERMINA
      >
        <FormLabel className='descriptionName'>
          Vaši termini:
        </FormLabel>
        <Table className='tablica' striped bordered hover>
          <thead>
            <tr>
              <th>"Korisnicko ime"</th>
              <th>Opis</th>
              <th>Oprema</th>
              <th>Prostorija</th>
              <th>Datum</th>
              <th>Vrijeme</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {//DODAJ PRAVI DATA
              currentItems2.map((item) => (
                <tr key={item.id}>
                  <td>{item.appointment}</td>
                  <td>{item.description}</td>
                  <td>{item.equipment}</td>
                  <td>{item.room}</td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>
                    <Button
                      variant="link"
                    //DODAJ OTKAZIVANJE
                    >
                      Otkaži ovaj termin
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <br />

        <Container className='d-flex justify-content-center'>
          <Pagination>
            {Array.from({ length: Math.ceil(data2.length / itemsPerPage) }, (_, index) => index + 1).map((pageNumber) => (
              <Pagination.Item
                key={pageNumber}
                active={pageNumber === currentPage2}
                onClick={() => handlePageChange2(pageNumber)}
              >
                {pageNumber}
              </Pagination.Item>
            ))}
          </Pagination>
        </Container>
      </Container>


      <Container //OPISI BOLEST TEXT
      >
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className='descriptionName'>Unesite opis zdravstvenog problema:</Form.Label>
            <Form.Control as="textarea" rows={2} />
          </Form.Group>
          <Container className='d-flex justify-content-center'>
            <Button variant='primary' type="submit">Predaj opis</Button>
          </Container>

        </Form>
      </Container>


      <br /><br />

      <Container //TABLICA ZA NOVE TERMINE
      >
        <FormLabel className='descriptionName'>
          Odaberite novi termin:
        </FormLabel>
        <Table className='tablica' striped bordered hover>
          <thead>
            <tr>
              <th>"Korisnicko ime"</th>
              <th>Opis</th>
              <th>Oprema</th>
              <th>Prostorija</th>
              <th>Datum</th>
              <th>Vrijeme</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.appointment}</td>
                <td>{item.description}</td>
                <td>{item.equipment}</td>
                <td>{item.room}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td> <Button variant="link"
                  onClick={() => handleButtonClick(item.date)}
                > Odaberi ovaj termin </Button> </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <br />

        <Container className='d-flex justify-content-center'>
          <Pagination>
            {Array.from({ length: Math.ceil(data1.length / itemsPerPage) }, (_, index) => index + 1).map((pageNumber) => (
              <Pagination.Item
                key={pageNumber}
                active={pageNumber === currentPage}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </Pagination.Item>
            ))}
          </Pagination>
        </Container>
      </Container>

      <br /> <br /><br />
      <Container //KALENDAR
        className='d-flex justify-content-center'>
        <Card>
          <Card.Header>Vaš odabrani termin označen je ovdje:</Card.Header>
          <Card.Body>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
            />
          </Card.Body>
          <Container className='d-flex justify-content-center'>
            <Button variant='primary' type='submit'> Potvrdi odabir </Button>
          </Container>
          <br />
        </Card>
      </Container >

      <br /><br /><br />

    </Container >
  );
};

export default User;