import {
    Button, Form, Row, Col, Container, Navbar,
    Nav, InputGroup, ButtonGroup, FormLabel, ToggleButton, ToggleButtonGroup,
    NavbarText, NavDropdown, Table, Pagination, Card
} from 'react-bootstrap';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useLocalState } from '../util/useLocalStorage';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { LogOut } from '../services/LogOut';


const Employee = () => {





    const [jwt, setJwt] = useLocalState("", "jwt");



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


    //nekoliko funkcija da mijenjas stranice tablice

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;  //kolko oces zahtjeva po stranici
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
            appointment: `Korisnik ${index + 1}`,
            description: `Description ${index + 1}`,
            equipment: `Equipment ${index + 1}`,
            room: `Room ${index + 1}`,
            date: `${day}.${month}.${year}.`,
            time: `11:00`
        };
    });

    //prikaz stranica
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data1.slice(indexOfFirstItem, indexOfLastItem);


    const handleAccept = () => {
        //tu ubaci logiku za Accept 
    };
    const handleReject = () => {
        //tu ubaci logiku za Decline
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



            <Container //TABLICA ZA TERMINE
            >
                <FormLabel className='descriptionName'>
                    Popis termina:
                </FormLabel>
                <Table className='tablica' striped bordered hover>
                    <thead>
                        <tr>
                            <th>Ime korisnika</th>
                            <th>Opis</th>
                            <th>Oprema</th>
                            <th>Prostorija</th>
                            <th>Datum</th>
                            <th>Vrijeme</th>
                            <th colSpan={2}>Odobri / Odbij</th>

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
                                    onClick={() => handleAccept()}
                                > Odobri termin </Button> </td>
                                <td> <Button variant="link"
                                    onClick={() => handleReject()}
                                > Odbij termin </Button> </td>
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









        </Container>
    );
}
export default Employee;