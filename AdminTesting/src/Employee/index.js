import {
    Button, Form, Row, Col, Container, Navbar,
    Nav, InputGroup, ButtonGroup, FormLabel, ToggleButton, ToggleButtonGroup,
    NavbarText, NavDropdown, Table, Pagination, Card, Dropdown, Alert
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

    const [EmpPage, setEmpPage] = useState(1);
    const [FilterPage, setFilterPage] = useState(1);
    
    const [empItems, setempItems] = useState([]);
    const [filterItems, setfilterItems] = useState([]);

    const [selectedSmjena, setSelectedSmjena] = useState('');
    const [username, setUsername] = useState('');

    const itemsPerPage = 5;

    const handleSmjenaChange = (item) => {
        setSelectedSmjena(item.target.id);
    };
    const handleUsernameChange = (item) => {
        setUsername(item.target.value);
    };
    //prijenos iz jedne u drugu tablicu
    const handlePageChange = (pageNumber) => {
        setEmpPage(pageNumber);
    };
    const handleFilterPageChange = (pageNumber) => {
        setFilterPage(pageNumber);
    };
    
    
    // cisto primjer podataka da mozes testirat kak izgleda

    const data1 = Array.from({ length: 17 }, (_, index) => {
        const today = new Date();
        const currentDate = new Date(today.setDate(today.getDate() + index));
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        return {
            id: index + 1,
            ime: `Ime ${index + 1}`,
            prezime: `Prezime ${index + 1}`,
            email: `E-mail ${index + 1}`,
            Smjena: `1`,

            room: `A2`,
            date: `${day}.${month}.${year}.`,
            spol: `M`
        };
    });
    //fetch za sve employee
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
    const indexOfLastItem = EmpPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    
    // empItems = data1.slice(indexOfFirstItem, indexOfLastItem);
    const indexOfLastItem2 = FilterPage * itemsPerPage;
    const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage;

    useEffect(() => {
        setempItems(data1.slice(indexOfFirstItem, indexOfLastItem));
        setfilterItems(data1.slice(indexOfFirstItem2, indexOfLastItem2));
    }, [EmpPage, FilterPage, data1]);
    



    const handleAdd = () => {
        //fetch post username, selectedSmjena
        alert("ID smjene: " + selectedSmjena +" Username: "+ username);
    };

    const handleRemove = (item) => {
        setempItems((empItems) =>
            empItems.filter((selectedItem) => selectedItem.id !== item.id)
        );
        alert("Maknut je " + item.id);
        //fetch post id
        //setfilterItems([]);
    };

    const handleFilter = () =>{

        alert("Smjena:" + + " Spol: " + + " Godina Zapošljivanja: ");
    };
    const handleFilterReset = () =>{

        alert("Maknule su se sve filter postavke!");
    };
/*
    const handleAccept = (selectedItem) => {
        setroomItems((prevfilterItems) => [...prevfilterItems, selectedItem]);
        setempItems((prevempItems) =>
            prevempItems.filter((item) => item.id !== selectedItem.id)
        );
        //setfilterItems([]);
    };


    const handleReject = (item) => {
        setroomItems((prevfilterItems) =>
            prevfilterItems.filter((completedItem) => completedItem.id !== item.id)
        );
        setempItems((prevempItems) => [...prevempItems, item]);
        //setfilterItems([]);
    };


    const handleDelete = (item) => {
        // logika za brisanje
        setfilterItems((prevfilterItems) =>
            prevfilterItems.filter((completedItem) => completedItem.id !== item.id)
        );
    }
    const handleQuit = (item) => {
        //logika za otkazivanje
        setempItems((prevfilterItems) => [...prevfilterItems, item]);
        setfilterItems((prevfilterItems) =>
            prevfilterItems.filter((completedItem) => completedItem.id !== item.id)
        );
    };

    const handleCheck = (item) => {

        if (item.equipment === "Potrebno dodijeliti") {
            alert('Molimo unesite opremu.');
            return;
        }
        //provjeri jel slobodno
        if (true) {

            setfilterItems((prevfilterItems) => [...prevfilterItems, item]);
            setroomItems((prevRoomItems) => prevRoomItems.filter((roomItem) => roomItem.id !== item.id));
        } else {
            //ispisi datum kad moze
            console.log(`Recommendation:`);
        }

    }

    const setEquipment = (item) => (event) => {
        const selectedEquipment = event.target.value;
        const updatedItem = { ...item, equipment: selectedEquipment };
        setfilterItems((prevRoomItems) =>
            prevRoomItems.map((roomItem) =>
                roomItem.id === item.id ? updatedItem : roomItem
            )
        );
    };
*/

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
                            <Navbar.Brand className="pageName">Admin</Navbar.Brand>
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

            <br /> <br /><br /><br /> <br></br>
            <Card className='text-center'>
                <Card.Header >Dodaj zaposlenika</Card.Header>
                    <Card.Body>
                        <Card.Title >Upiši podatke:</Card.Title>
                        
                            <Form className='no-gutters' onSubmit={handleAdd}>
                                <Row>
                                    <Col>
                                        <Form.Label>Smjena: </Form.Label>
                                        <Form.Check
                                            inline
                                            label="Neparni Ujutro"
                                            name="group1"
                                            type={'radio'}
                                            onChange={handleSmjenaChange}
                                            id={`1`}
                                        />
                                        <Form.Check
                                            inline
                                            label="Neparni Popodne"
                                            name="group1"
                                            type={'radio'}
                                            onChange={handleSmjenaChange}
                                            id={`2`}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Group as={Row} className='mb-3'>
                                            <Form.Label column sm='3'>
                                            Upiši username:
                                            </Form.Label>
                                            <Col sm='8'>
                                            <Form.Control type='text' placeholder='username' onChange={handleUsernameChange} value={username}/>
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button type='submit'>Dodaj</Button>
                                    </Col>
                                </Row>

                        </Form>
                    </Card.Body>
            </Card> 
            <br></br>

            <Container //TABLICA ZA ZAPOSLENIKE
            >
                <FormLabel className='descriptionName'>
                    Zaposlenici:
                </FormLabel>
                <Table className='tablica' striped bordered hover>
                    <thead>
                        <tr>
                            <th>Ime</th>
                            <th>Prezime</th>
                            <th>E-mail</th>
                            <th>Smjena</th>
                            <th>Datum zapošljivanja</th>
                            <th>Spol</th>
                            <th>Ukloni zaposlenika</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.ime}</td>
                                <td>{item.prezime}</td>
                                <td>{item.email}</td>
                                <td>{item.Smjena}</td>
                                <td>{item.date}</td>
                                <td>{item.spol}</td>
                                <td> <Button onClick={() => handleRemove(item)}> Ukloni </Button> </td>
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
                                active={pageNumber === EmpPage}
                                onClick={() => handlePageChange(pageNumber)}>
                                {pageNumber}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Container>
            </Container>


            <Container //TABLICA ZA FILTRIRANJE
            >
                <FormLabel className='descriptionName'>
                    Statistika:
                </FormLabel>
                <Table className='tablica' striped bordered hover>
                    <thead>
                        <tr>
                            <th colSpan={6} > 
                            <Form>
                            <Row>
                                    <Col>
                                        <Form.Label>Smjena: </Form.Label>
                                        <Form.Check 
                                            inline
                                            label="Neparni Ujutro"
                                            name="group1"
                                            type={'radio'}
                                            id={`1`}
                                            
                                        />
                                        <Form.Check
                                            inline
                                            label="Neparni Popodne"
                                            name="group1"
                                            type={'radio'}
                                            id={`2`}
                                        />
                                    </Col>
                                    
                                    <Col>
                                        <Form.Label>Spol: </Form.Label>
                                        <Form.Check
                                            inline
                                            label="M"
                                            name="group2"
                                            type={'radio'}
                                            id={`M`}
                                        />
                                        <Form.Check
                                            inline
                                            label="F"
                                            name="group2"
                                            type={'radio'}
                                            id={`F`}
                                        />
                                    </Col>
                                </Row>
                                    
                                <Row>
                                    <Col className='text-center'>
                                        <Form.Group as={Row} className='mb-3'>
                                            <Form.Label column sm='7' >
                                            Godina zapošljivanja:
                                            </Form.Label>
                                            <Col sm='3'>
                                                <Form.Control type='number' placeholder='2024' />
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Button type='submit'onClick={() => handleFilter() } style={{ marginRight: '0.5rem' }}>Filtriraj</Button>
                                        <Button type='submit'onClick={() => handleFilterReset()}>Resetiraj</Button>
                                    </Col>
                                    
                                </Row>
                            </Form>
  
                            </th>
                        </tr>
                        
                        <tr>
                            <th>Ime</th>
                            <th>Prezime</th>
                            <th>E-mail</th>
                            <th>Smjena</th>
                            <th>Datum zapošljivanja</th>
                            <th>Spol</th>

                        </tr>
                    </thead>
                    <tbody>
                        {filterItems.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center">
                                    Nema zaposlenika koji odgovarju zadanim uvjetima
                                </td>
                            </tr>
                        ) : (
                            filterItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.ime}</td>
                                    <td>{item.prezime}</td>
                                    <td>{item.email}</td>
                                    <td>{item.Smjena}</td>
                                    <td>{item.date}</td>
                                    <td>{item.spol}</td>
                                </tr>
                            ))

                        )}
                    </tbody>
                </Table>
                <br />
                <Container className='d-flex justify-content-center'>
                    <Pagination>
                        {Array.from({ length: Math.ceil(filterItems.length / itemsPerPage) }, (_, index) => index + 1).map((pageNumber) => (
                            <Pagination.Item
                                key={pageNumber}
                                active={pageNumber === FilterPage}
                                onClick={() => handleFilterPageChange(pageNumber)}
                            >
                                {pageNumber}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Container>
            </Container>





          
        </Container>
    );
}
export default Employee;