import React from 'react';
import { useLocalState } from "../../util/useLocalStorage";
import { useEffect, useState } from 'react';
import LogOut from "../../services/LogOut";
import Settings from "../Settings/settings";
import { jwtDecode } from "jwt-decode";
import {
    Button, Form, Row, Col, Container, Navbar,
    Nav, InputGroup, ButtonGroup, FormLabel, ToggleButton, ToggleButtonGroup,
    NavbarText, NavDropdown, Table, Pagination, Card, CardFooter, CardBody
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [oib, setOib] = useState('');
    const [validated, setValidated] = useState(false);


    //Navigacija
    const Employee="EMPLOYEE";
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
 
 
 
 
 
     if(rolepriv!==Employee && rolepriv!==Admin && rolepriv!==AdminEmployee){
     
         LogOut();
 
     }





    //





    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const navig = useNavigate();



    const handleImeChange = (event) => {
        const newIme = event.target.value;
        const isValidName = newIme.trim() !== '';
        setIme(newIme);
        setValidated(isValidName);
    };

    const handlePrezimeChange = (event) => {
        const newPrezime = event.target.value;
        const isValidPrezime = newPrezime.trim() !== '';
        setPrezime(newPrezime);
        setValidated(isValidPrezime);
    };

    const handleOibChange = (event) => {
        const newOib = event.target.value;
        setOib(newOib);
        setValidated(false);
    };
    const isValidOIB = (oib) => {
        const oibRegex = /^\d{11}$/;
        return oibRegex.test(oib);
    };


    const handleReload = () => {
        window.location.reload()
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };



    const GoBack = () => {
        navig(-1);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);

        if (!ime || !prezime || !oib || !isValidOIB(oib)) {
            alert('Molimo ispunite sva polja ispravno.');
            return;
        }

        fetch(`http://localhost:8080/api/v1/func/appointment/searchUser/${oib}`, {
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
            mode: "cors",
            method: "GET"
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {

                   
                    console.error('Error fetching searchUser:', response.status, response.statusText);
                    
                }
            })
            .then((jsonData) => {
                if (jsonData.length === 0) {
                    alert("Pretraženi korisnik je djelatnik ili nema termina");
                    window.location.reload();
                }
                setData(jsonData);
            })
            .catch((error) => {
                alert("Pretraženi korisnik nije registriran");
                console.error('Error during fetch:', error);

               
            });
    };

    const formatDate = (dateTimeString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        const formattedDate = new Date(dateTimeString).toLocaleDateString('en-GB', options);
        return formattedDate;
    };

    // console.log(currentItems);
    return (
        <Container>

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
                            <Navbar.Brand className='pageName'>Pretraživanje</Navbar.Brand>
                        </Navbar.Collapse>
                    </Col>
                    <Col xs={1}>
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <NavDropdown title="Opcije" id="basic-nav-dropdown" className="bigBoldText">
                                    <NavDropdown.Item onClick={() => GoBack()}>Povratak</NavDropdown.Item>
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
            <br /><br /><br /><br /><br /><br /><br /><br />

            <Container className="d-flex justify-content-center align-items-center">
                <Card style={{ width: '400px', textAlign: 'center' }}>
                    <Card.Header>Pretraži korisnika</Card.Header>
                    <Card.Body>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group controlId="formIme">
                                <Form.Label>Ime</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Unesite ime"
                                    value={ime}
                                    onChange={handleImeChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Molimo unesite ime.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formPrezime">
                                <Form.Label>Prezime</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Unesite prezime"
                                    value={prezime}
                                    onChange={handlePrezimeChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Molimo unesite prezime.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formOIB">
                                <Form.Label>OIB</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Unesite OIB"
                                    value={oib}
                                    isInvalid={validated && !isValidOIB(oib)}
                                    isValid={validated && isValidOIB(oib)}
                                    onChange={handleOibChange}
                                    pattern="\d{11}"
                                />
                                <Form.Control.Feedback type="invalid">
                                    OIB mora imati točno 11 znamenki.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                    </Card.Body>

                    <Card.Footer>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Pretraži
                        </Button>
                    </Card.Footer>
                </Card>
            </Container>

            <br /><br /><br /><br />

            <Container //TABLICA ZAKAZANIH TERMINA
            >
                <FormLabel className='descriptionName'>
                    Zakazani termini:
                </FormLabel>
                <Table className='tablica' striped bordered hover>
                    <thead>
                        <tr>
                            <th>Korisničko ime</th>
                            <th>Datum i vrijeme</th>
                            <th>Prostorija</th>
                            <th>Oprema</th>
                            <th>Liječnik</th>
                            <th>Opis pregleda</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItems.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center">
                                        Pretražite korisnika za prikaz termina
                                    </td>
                                </tr>
                            ) : (

                                currentItems.map((item) => (

                                    <tr key={item.id}>
                                        <td>{item.user.username}</td>
                                        <td>{formatDate(item.appointmentTime)}</td>
                                        <td>{item.room.name}</td>
                                        <td>{item.equipment.name}</td>
                                        <td>{item.djelatnik.firstname + " " + item.djelatnik.lastname}</td>
                                        <td>{item.description}</td>
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



        </Container >


    );
}; export default Search;