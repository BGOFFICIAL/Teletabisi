import React from "react";
import { useLocalState } from "../../util/useLocalStorage";
import { useEffect, useState } from "react";
import LogOut from "../../services/LogOut";
import Settings from "../Settings/settings";
import { jwtDecode } from "jwt-decode";
import Navigacija from "../../services/navigate";
import {
  Button, Form, Row, Col, Container, Navbar,
  Nav, InputGroup, ButtonGroup, FormLabel, ToggleButton, ToggleButtonGroup,
  NavbarText, NavDropdown, Table, Pagination, Card, CardFooter, CardBody
} from "react-bootstrap";
import Calendar, { Navigation } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DateTimePicker from 'react-datetime-picker';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';


const User = () => {

  const [jwt, setJwt] = useLocalState("", "jwt");

  Navigacija(jwt);

  //VARIJABLE
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [data, setData] = useState([]);
  const [description, setDescription] = useState('');


  // funkcije
  useEffect(() => {
    const fetchData = async () => {
      try {

        //POCETAK KOMENTARA  

        const response = await fetch('http://localhost:8080/api/v1/func/appointment/request/all-appointments', {
          headers: {
            "Authorization": `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
          method: "GET"
        });


        console.log(response);
        const jsonData = await response.json();
        console.log(jsonData);

        setData(jsonData);

        //ZAVRSETAK KOMENTARA
      } catch (error) {
        console.error('Empty', error);
      }
    };
    fetchData();
  }, []);

  //HANDLE funckije

  const handleReject = () => {
    //izbrisi termin (auth/reject?)
    // /api/v1/auth/appointment/reject/{appointmentId}
  };


  const handleReload = () => {
    window.location.reload()
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // formatiranje za datum, moguce nepotrebno

  const formattedDateTime = selectedDate.toISOString().slice(0, 19).replace("T", " ");

  // Salji zahtjeve


  const handleSubmission = () => {

    if (!description.trim()) {
      alert('Molimo unesite opis bolesti.');
      return;
    }

    const selectedDay = selectedDate.getDay();
    if (selectedDay === 0 || selectedDay === 6) {
      alert('Izabrani dan je vikend, molimo izaberite radni dan.');
      return;
    }

    const time = selectedDate.getHours();
    if (time < 8 || time >= 20) {
      alert('Molimo izaberite vrijeme između 8:00 i 20:00 sati.');
      return;
    }

    const jsonData = {
      description: description,
      dateTime: formattedDateTime,
    };

    alert('Uspješno poslano');
    setDescription('');
    setSelectedDate(new Date());

    try {

      // POCETAK KOMENTARA
      fetch("http://localhost:8080/api/v1/func/appointment/request", {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwt}`,
        },
        mode: "cors",
        method: "POST",
        body: JSON.stringify(jsonData),
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error("Error:", error)
        });
      //ZAVRSETAK KOMENTARA
    }

    catch (error) {
      return Promise.reject("Invalidni zahtjev");
      ;
    }
    console.log(jsonData);

  };

  //Pagination and calendar setup

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const today = new Date();
  const yearPlaceholder = today.getFullYear().toString();
  const monthPlaceholder = (today.getMonth() + 1).toString();
  const dayPlaceholder = today.getDate().toString();


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
              <th>Ime i prezime</th>
              <th>Opis</th>
              <th>Oprema</th>
              <th>Prostorija</th>
              <th>Datum i Vrijeme</th>
              <th>Otkaži</th>
            </tr>
          </thead>
          <tbody>
            {//DODAJ PRAVI DATA
              currentItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center">
                    Nemate zakazanih termina
                  </td>
                </tr>
              ) : (

                currentItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.user.firstname + " " + item.user.lastname}</td>
                    <td>{item.description}</td>
                    <td>{item.equipment.name}</td>
                    <td>{item.room.name}</td>
                    <td>{item.appointmentTime}</td>
                    <td>
                      <Button
                        variant="link"
                        onClick={() => handleReject()}

                      >
                        Otkaži ovaj termin
                      </Button>
                    </td>
                  </tr>
                )))}
          </tbody>
        </Table>

        <br />

        <Container //Pagination
          className='d-flex justify-content-center'>
          <Pagination>
            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => index + 1).map((pageNumber) => (
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
        <br />
        <Container className='d-flex justify-content-center'>
          <Button
            variant='primary'
            onClick={() => handleReload()}
          >
            Osvježi
          </Button>
        </Container>


      </Container>

      <br /><br /><br />


      <Container //KARTICA
        className='d-flex justify-content-center'>
        <Card border="primary" style={{ width: '47rem' }}>
          <Card.Header as='h4' >
            <Container className='d-flex justify-content-center'>
              Molimo ispunite zahtjev za novi termin:
            </Container>
          </Card.Header>
          <CardBody>
            <Row >
              <Container //OPISI BOLEST TEXT
              >
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label className='descriptionName'>Unesite opis zdravstvenog problema:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={description}
                      onChange={handleDescriptionChange}
                    />
                  </Form.Group>
                </Form>
              </Container>
            </Row>
          </CardBody>

          <CardBody>
            <Form.Label className='descriptionName'>
              Unesite datum i vrijeme željenog termina:
            </Form.Label>
            <FormLabel>
              Radno vrijeme klinike:
              Pon - Pet, od 8:00 do 20:00 sati
            </FormLabel>
          </CardBody>



          <CardBody>
            <Container className='d-flex justify-content-center'>
              <DateTimePicker
                minDate={new Date()}
                disableWeekends={true}
                disableClock={true}
                disableCalendar={true}
                clearIcon={null}
                yearPlaceholder={yearPlaceholder}
                monthPlaceholder={monthPlaceholder}
                dayPlaceholder={dayPlaceholder}
                hourPlaceholder='08'
                minutePlaceholder='00'
                minTime={new Date(2000, 0, 1, 8, 0)}
                maxTime={new Date(2000, 0, 1, 20, 0)}
                onChange={(date) => setSelectedDate(date)}
                value={selectedDate}
              />
            </Container>
          </CardBody>



          <Card.Body >
            <Row>
              <Col xs={6} className='d-flex justify-content-center align-items-center'>
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                />
              </Col>
              <Col xs={6} className='d-flex justify-content-center align-items-center'>
                <Clock
                  renderNumbers={true}
                  renderSecondHand={false}
                  value={selectedDate}
                />
              </Col>
            </Row>
            <br />
          </Card.Body>


          <CardFooter>
            <Container className='d-flex justify-content-center'>

              <Button
                variant='primary' type='submit'
                onClick={handleSubmission}
              > Potvrdi odabir </Button>
            </Container>
          </CardFooter>
        </Card>
      </Container >


      <br /> <br /><br />
      <br /> <br /><br />
      <br /><br /><br />

    </Container >
  );
};

export default User;