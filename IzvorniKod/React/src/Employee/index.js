import {
    Button, Form, Row, Col, Container, Navbar,
    Nav, InputGroup, ButtonGroup, FormLabel, ToggleButton, ToggleButtonGroup,
    NavbarText, NavDropdown, Table, Pagination, Card, Dropdown
} from 'react-bootstrap';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useLocalState } from '../util/useLocalStorage';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { LogOut } from '../services/LogOut';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DateTimePicker from 'react-datetime-picker';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';



const Employee = () => {

    /* const [jwt, setJwt] = useLocalState("", "jwt");
     if (jwt) {
         const role = UseGetRoleFromJWT(jwt);
         if (role === "USER") {
             window.location.href = "/user";
             return <div>Loading....</div>
 
         } else if (role === "ADMIN") {
             window.location.href = "/admin";
             return <div>Loading....</div>
         }
 
         else if (role !== "EMPLOYEE") {
             window.location.href = "/welcome";
             return <div>Loading....</div>
         }
 
 
 
     }
 
     function UseGetRoleFromJWT(jwt) {
         if (jwt) {
             try {
                 const decoded = jwtDecode(jwt);
                 console.log(decoded.authorities);
                 return decoded.roles[0].authority;
             } catch (error) {
                 window.location.href = "/welcome";
                 return <div>Loading....</div>
             };
         }
 
         else {
             return "";
         }
 
 
 
     }
 */

    //nekoliko funkcija da mijenjas stranice tablice

    const [pendingPage, setpendingPage] = useState(1);
    const [ownPage, setownPage] = useState(1);
    const [roomPage, setroomPage] = useState(1);

    const itemsPerPage = 10;
    const handlePageChange = (pageNumber) => {
        setpendingPage(pageNumber);
    };
    const handleownPageChange = (pageNumber) => {
        setownPage(pageNumber);
    };
    const handleroomPageChange = (pageNumber) => {
        setroomPage(pageNumber);
    };

    //prijenos iz jedne u drugu tablicu
    const [pendingItems, setpendingItems] = useState([]);
    const [ownItems, setownItems] = useState([]);
    const [roomItems, setroomItems] = useState([]);

    // cisto primjer podataka da mozes testirat kak izgleda

    const data1 = Array.from({ length: 17 }, (_, index) => {
        const today = new Date();
        const currentDate = new Date(today.setDate(today.getDate() + index));
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        return {
            id: index + 1,
            appointment: `Korisnik ${index + 1}`,
            description: `Description ${index + 1}`,
            equipment: `Potrebno dodijeliti`,
            room: `A2`,
            date: `${day}.${month}.${year}.`,
            time: `11:00`
        };
    });

    //format date

    const formatDate = (dateString, timeString) => {
        const dateParts = dateString.split('.');
        const timeParts = timeString.split(':');

        const year = parseInt(dateParts[2], 10);
        const month = parseInt(dateParts[1], 10) - 1;
        const day = parseInt(dateParts[0], 10);
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);

        return new Date(year, month, day, hours, minutes);
    };



    //prikaz stranica
    const indexOfLastItem = pendingPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // pendingItems = data1.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        setpendingItems(data1.slice(indexOfFirstItem, indexOfLastItem));
    }, [pendingPage, data1]);





    const handleAccept = (selectedItem) => {
        setroomItems((prevownItems) => [...prevownItems, selectedItem]);
        setpendingItems((prevpendingItems) =>
            prevpendingItems.filter((item) => item.id !== selectedItem.id)
        );
        //setownItems([]);
    };


    const handleReject = (item) => {
        setroomItems((prevownItems) =>
            prevownItems.filter((completedItem) => completedItem.id !== item.id)
        );
        setpendingItems((prevpendingItems) => [...prevpendingItems, item]);
        //setownItems([]);
    };


    const handleDelete = (item) => {
        // logika za brisanje
        setownItems((prevownItems) =>
            prevownItems.filter((completedItem) => completedItem.id !== item.id)
        );
    }
    const handleQuit = (item) => {
        //logika za otkazivanje
        setpendingItems((prevownItems) => [...prevownItems, item]);
        setownItems((prevownItems) =>
            prevownItems.filter((completedItem) => completedItem.id !== item.id)
        );
    };

    const handleSearch = () => {
        window.location.href = "/search"
    };
    const handleMail = () => {
        window.location.href = "/mail"
    };

    const handleReload = () => {
        window.location.reload()
    };

    const handleCheck = (item) => {

        if (item.equipment === "Potrebno dodijeliti") {
            alert('Molimo unesite opremu.');
            return;
        }
        //provjeri jel slobodno
        if (true) {

            setownItems((prevOwnItems) => [...prevOwnItems, item]);
            setroomItems((prevRoomItems) => prevRoomItems.filter((roomItem) => roomItem.id !== item.id));
        } else {
            //ispisi datum kad moze
            console.log(`Recommendation:`);
        }

    }

    const setEquipment = (item) => (event) => {
        const selectedEquipment = event.target.value;
        const updatedItem = { ...item, equipment: selectedEquipment };
        setroomItems((prevRoomItems) =>
            prevRoomItems.map((roomItem) =>
                roomItem.id === item.id ? updatedItem : roomItem
            )
        );
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
            <Navbar //NASLOV I OPCIJE
                className='purple' /* bg="dark" data-bs-theme="dark" */ fixed="top">
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
                            <Navbar.Brand className="pageName">Djelatnik</Navbar.Brand>
                        </Navbar.Collapse>
                    </Col>
                    <Col xs={1}>
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <NavDropdown title="Opcije" id="basic-nav-dropdown" className="bigBoldText">
                                    <NavDropdown.Item href="/settings">Postavke</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={() => LogOut()}>Odjavi se</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Col>
                </Container>
            </Navbar>

            <br /> <br /><br /><br /><br /><br />


            <Container className='d-flex justify-content-center'>
                <Row>
                    <Col><Button
                        variant='primary'
                        onClick={() => handleSearch()}>
                        Pretraži korisnika
                    </Button></Col>
                    <Col><Button
                        variant='primary'
                        onClick={() => handleMail()}>
                        Pošalji mail
                    </Button></Col>
                    <Col><Button
                        variant='primary'
                        onClick={() => handleReload()}>
                        Osvježi
                    </Button></Col>
                </Row>


            </Container>

            <br /><br />

            <Container //TABLICA ZA TERMINE
            >
                <FormLabel className='descriptionName'>
                    Popis aktualnih zahtjeva:
                </FormLabel>
                <Table className='tablica' striped bordered hover>
                    <thead>
                        <tr>
                            <th>Ime korisnika</th>
                            <th>Opis</th>
                            <th>Datum</th>
                            <th>Vrijeme</th>
                            <th>Odaberi</th>

                        </tr>
                    </thead>
                    <tbody>
                        {pendingItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.appointment}</td>
                                <td>{item.description}</td>
                                <td>{item.date}</td>
                                <td>{item.time}</td>
                                <td> <Button variant="link"
                                    onClick={() => handleAccept(item)} //tu nesto??
                                > Odaberi zahtjev </Button> </td>

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
                                active={pageNumber === pendingPage}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                {pageNumber}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Container>
            </Container>

            <Container //TABLICA ZA OPREMU
            >
                <FormLabel className='descriptionName'>
                    Dodijeli opremu:
                </FormLabel>
                <Table className='tablica' striped bordered hover>
                    <thead>
                        <tr>
                            <th>Ime korisnika</th>
                            <th>Opis</th>
                            <th>Oprema</th>
                            <th>Datum i vrijeme</th>
                            <th>Odustani</th>
                            <th>Potvrda odabira</th>

                        </tr>
                    </thead>
                    <tbody>
                        {roomItems.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center">
                                    Nemate odabranih termina
                                </td>
                            </tr>
                        ) : (

                            roomItems.map((item) => (


                                <tr key={item.id}>
                                    <td>{item.appointment}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <Form.Select
                                            required
                                            onChange={setEquipment(item)}
                                            aria-label="Default select example"

                                        >
                                            <option>Odaberi</option>
                                            <option value="Laser">Laser</option>
                                            <option value="Štake">Štake</option>
                                            <option value="Traka">Traka</option>
                                        </Form.Select>
                                    </td>
                                    <td>
                                        <DateTimePicker
                                            value={formatDate(item.date, item.time)}
                                            clearIcon={null}
                                            disableClock={true}
                                            disableCalendar={true}
                                        />
                                    </td>


                                    <td> <Button variant="link"
                                        onClick={() => handleReject(item)}
                                    > Odustani </Button> </td>
                                    <td><Button variant="link"
                                        onClick={() => handleCheck(item)}
                                    > Potvrdi odabir </Button></td>
                                </tr>



                            ))

                        )}
                    </tbody>
                </Table>

                <br />

                <Container className='d-flex justify-content-center'>
                    <Pagination>
                        {Array.from({ length: Math.ceil(roomItems.length / itemsPerPage) }, (_, index) => index + 1).map((pageNumber) => (
                            <Pagination.Item
                                key={pageNumber}
                                active={pageNumber === roomPage}
                                onClick={() => handleroomPageChange(pageNumber)}
                            >
                                {pageNumber}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Container>
            </Container>










            <Container //TABLICA ZA vlastite TERMINE
            >
                <FormLabel className="descriptionName">Popis dodijeljenih termina:</FormLabel>
                <Table className="tablica" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Ime korisnika</th>
                            <th>Opis</th>
                            <th>Oprema</th>
                            <th>Prostorija</th>
                            <th>Datum</th>
                            <th>Vrijeme</th>
                            <th>Otkaži</th>
                            <th>Izbriši</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ownItems.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center">
                                    Nemate dodijeljenih termina
                                </td>
                            </tr>
                        ) : (
                            ownItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.appointment}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        {item.equipment}
                                    </td>
                                    <td>
                                        {item.room}
                                    </td>
                                    <td>{item.date}</td>
                                    <td>{item.time}</td>
                                    <td> <Button variant="link"
                                        onClick={() => handleQuit(item)}
                                    > Otkaži termin </Button> </td>
                                    <td> <Button variant="link"
                                        onClick={() => handleDelete(item)}
                                    > Izbriši termin </Button> </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>

                <br />

                <Container className="d-flex justify-content-center">
                    <Pagination>
                        {Array.from({ length: Math.ceil(ownItems.length / itemsPerPage) }, (_, index) => index + 1).map(
                            (pageNumber) => (
                                <Pagination.Item
                                    key={pageNumber}
                                    active={pageNumber === ownPage}
                                    onClick={() => handleownPageChange(pageNumber)}
                                >
                                    {pageNumber}
                                </Pagination.Item>
                            )
                        )}
                    </Pagination>
                </Container>
            </Container>







        </Container>
    );
}
export default Employee;