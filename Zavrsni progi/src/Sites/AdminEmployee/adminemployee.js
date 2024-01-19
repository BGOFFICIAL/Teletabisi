import {
    Button, Form, Row, Col, Container, Navbar,
    Nav, InputGroup, ButtonGroup, FormLabel, ToggleButton, ToggleButtonGroup,
    NavbarText, NavDropdown, Table, Pagination, Card, Dropdown
} from "react-bootstrap";
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocalState } from "../../util/useLocalStorage";
import { jwtDecode } from "jwt-decode";
import LogOut from "../../services/LogOut";
import 'react-calendar/dist/Calendar.css';
import DateTimePicker from 'react-datetime-picker';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import Navigacija from "../../services/navigate";


const AdminEmployee = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");
    Navigacija(jwt);


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
    const [data, setData] = useState([]);
    const [pendingItems, setpendingItems] = useState([]);
    const [ownItems, setownItems] = useState([]);
    const [roomItems, setroomItems] = useState([]);
    const [eq, setEq] = useState([]);
    const [eqItems, setEqItems] = useState([]);
    const [initialDate, setInitialDate] = useState(false);

    //prikaz stranica
    const indexOfLastItem = pendingPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // pendingItems = data1.slice(indexOfFirstItem, indexOfLastItem);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetching data for pendingItems
                const response = await fetch('http://localhost:8080/api/v1/func/appointment/control', {
                    headers: {
                        "Authorization": `Bearer ${jwt}`,
                        "Content-Type": "application/json",
                    },
                    method: "GET"
                });
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching pendingItems:', error);
            }

            try {
                // Fetching data for equipment (eq)
                const eqResponse = await fetch('http://localhost:8080/api/v1/func/appointment/getEquipment', {
                    headers: {
                        "Authorization": `Bearer ${jwt}`,
                        "Content-Type": "application/json",
                    },
                    method: "GET"
                });
                const eqJsonData = await eqResponse.json();
                setEq(eqJsonData);
            }

            catch (error) {
                console.error('Error fetching equipment (eq):', error);
            }



            try {
                // Fetching data for equipment (eq)
                const ownResponse = await fetch('http://localhost:8080/api/v1/func/appointment/all-appointments', {
                    headers: {
                        "Authorization": `Bearer ${jwt}`,
                        "Content-Type": "application/json",
                    },
                    method: "GET"
                });
                const ownJsonData = await ownResponse.json();
                setownItems(ownJsonData);
            }

            catch (error) {
                console.error('Error fetching own items:', error);
            }

            // Setting pendingItems after fetching data
            setpendingItems(data.slice(indexOfFirstItem, indexOfLastItem));
            // Setting equipment (eqItems) after fetching data
            setEqItems(eq);
        };

        fetchData();
    }, [pendingPage, data, jwt]);


    const handleAccept = (selectedItem) => {
        setroomItems((prevownItems) => [...prevownItems, selectedItem]);

    };


    const handleReject = (item) => {
        setroomItems((prevownItems) =>
            prevownItems.filter((completedItem) => completedItem.id !== item.id)
        );

    };


    const handleDelete = (item) => {
        try {

            // POCETAK KOMENTARA
            fetch(`http://localhost:8080/api/v1/func/appointment/delete/${item.id}`, {
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`,
                },
                mode: "cors",
                method: "DELETE",
            })
                .then((response) => {
                    if (response.status == 200) {
                        alert("Uspješno izbrisan termin");
                    }
                    else {
                        alert("Neuspješno izbrisan termin");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error)
                });
            //ZAVRSETAK KOMENTARA
        }

        catch (error) {
            return Promise.reject("Invalidni zahtjev");
            ;
        }
    }
    const handleQuit = (item) => {

        // FETCH
        try {

            // POCETAK KOMENTARA
            fetch(`http://localhost:8080/api/v1/func/appointment/otkazi/${item.id}`, {
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`,
                },
                mode: "cors",
                method: "POST",
            })
                .then((response) => {
                    if (response.status == 200) {
                        alert("Uspješno otkazan termin");
                        return response.json();
                    }
                    else {
                        alert("Prekasno otkazan termin");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error)
                });
            //ZAVRSETAK KOMENTARA
        }

        catch (error) {
            return Promise.reject("Invalidni zahtjev");
            ;
        }


    };

    const handleSearch = () => {
        window.location.href = "/Search"
    };
    const handleMail = () => {
        window.location.href = "/Mail"
    };

    const handleReload = () => {
        window.location.reload()
    };

    const handleAddRoom = () => {
        window.location.href = "/AddRooms"
    };
    const handleAddEquipment = () => {
        window.location.href = "/AddEquipment"
    };

    const handlePromote = () => {
        // window.location.href = "/?"
    };


    //pocetak
    const handleCheck = async (item) => {
        try {
            if (item.equipment === "Potrebno dodijeliti") {
                alert('Molimo unesite opremu.');
                return;
            }



            const adjustedDate = new Date(item.appointmentTime
            );


            const selectedDay = adjustedDate.getDay();
            if (selectedDay === 0 || selectedDay === 6) {
                alert('Izabrani dan je vikend, molimo izaberite radni dan.');
                return;
            }

            const time = adjustedDate.getHours();
            if (time < 8 || time > 19) {
                alert('Molimo izaberite vrijeme između 8:00 i 20:00 sati.');
                return;
            }

            const minute = adjustedDate.getMinutes();
            if (minute !== 0) {
                alert('Molimo izaberite puni sat.');
                return;
            }
            adjustedDate.setHours(adjustedDate.getHours() + 1);

            console.log(item.equipment + " " + item.appointmentTime);
            console.log(adjustedDate);

            const response1 = await fetch(`http://localhost:8080/api/v1/func/appointment/accept/${item.id}`, {
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`,
                },
                mode: "cors",
                method: "POST",
                body: JSON.stringify({
                    equipmentName: item.equipment,
                }),
            });

            if (response1.status === 200) {
                alert('Uspješno prihvaćen termin!');
            } else if (response1.status === 400) {
                alert('Imate dogovoren termin u isto vrijeme.');
                return;
            } else {
                alert('Odaberi dostupnu opremu.');
                return;
            }

            // Prvi fetch je završen, sada možete izvršiti drugi fetch
            const response2 = await fetch(`http://localhost:8080/api/v1/func/appointment/newDate/${item.id}`, {
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`,
                },
                mode: "cors",
                method: "POST",
                body: JSON.stringify({
                    newAppointmentDateTime: adjustedDate,
                }),
            });

            if (response2.status === 200 && initialDate) {
                alert('Uspješno ažuriran termin!');
                setInitialDate(false);
            }

            // Nakon završetka oba fetch poziva, možete izvršiti dodatne radnje
            setroomItems((prevRoomItems) => prevRoomItems.filter((roomItem) => roomItem.id !== item.id));
        } catch (error) {
            console.error("Error:", error);
            return Promise.reject("Invalidni zahtjev");
        }
    };
    //kraj

    const setEquipment = (item) => (event) => {
        const selectedEquipment = event.target.value;
        const updatedItem = { ...item, equipment: selectedEquipment };
        setroomItems((prevRoomItems) =>
            prevRoomItems.map((roomItem) =>
                roomItem.id === item.id ? updatedItem : roomItem
            )
        );
    };


    const setDate = (item) => (selectedDate) => {
        setInitialDate(true);
        const updatedItem = {
            ...item, appointmentTime: selectedDate
        };
        setroomItems((prevRoomItems) =>
            prevRoomItems.map((roomItem) =>
                roomItem.id === item.id ? updatedItem : roomItem
            )
        );
    };

    const formatDate = (dateTimeString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        const formattedDate = new Date(dateTimeString).toLocaleDateString('en-GB', options);
        return formattedDate;
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
                            <Navbar.Brand className="pageName">Djelatnik (Admin)</Navbar.Brand>
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
                    <Col><Button
                        variant='success'
                        onClick={() => handleAddEquipment()}>
                        Dodaj opremu
                    </Button></Col>
                    <Col><Button
                        variant='success'
                        onClick={() => handleAddRoom()}>
                        Dodaj prostoriju
                    </Button></Col>
                    {/*
            <Col><Button
              variant='success'
              onClick={() => handlePromote()}>
              Promoviraj djelatnika
            </Button></Col>
            */ }
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
                            <th>Ime i prezime</th>
                            <th>Opis</th>
                            <th>Datum i vrijeme</th>
                            <th>Odaberi</th>

                        </tr>
                    </thead>
                    <tbody>
                        {pendingItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.user.firstname + " " + item.user.lastname}</td>
                                <td>{item.description}</td>
                                <td>{formatDate(item.appointmentTime)}</td>
                                <td> <Button variant="link"
                                    onClick={() => handleAccept(item)}
                                > Odaberi zahtjev </Button> </td>

                            </tr>

                        ))}
                    </tbody>
                </Table>

                <br />

                <Container className='d-flex justify-content-center'>
                    <Pagination>
                        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => index + 1).map((pageNumber) => (
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
                            <th>Ime i prezime</th>
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
                                    <td>{item.user.firstname + " " + item.user.lastname}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <Form.Select
                                            required
                                            onChange={setEquipment(item)}
                                            aria-label="Default select example"
                                        >
                                            <option>Odaberi</option>
                                            {eq.map((equipmentOption) => (
                                                <option key={equipmentOption} value={equipmentOption}>
                                                    {equipmentOption}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </td>
                                    <td>
                                        <DateTimePicker
                                            minDate={new Date()}
                                            value={item.appointmentTime}
                                            onChange={setDate(item)}
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
                            <th>Ime i prezime</th>
                            <th>Opis</th>
                            <th>Oprema</th>
                            <th>Prostorija</th>
                            <th>Datum i vrijeme</th>
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
                                    <td>{item.user.firstname + " " + item.user.lastname}</td>
                                    <td>{item.description}</td>

                                    <td>{item.equipment.name}</td>

                                    <td>
                                        {item.room.name}
                                    </td>
                                    <td>{formatDate(item.appointmentTime)}</td>

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
export default AdminEmployee;