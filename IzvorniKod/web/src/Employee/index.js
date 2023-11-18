import {
    Button, Form, Row, Col, Container, Navbar,
    Nav, InputGroup, ButtonGroup, FormLabel, ToggleButton, ToggleButtonGroup,
    NavbarText, NavDropdown
} from 'react-bootstrap';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useLocalState } from '../util/useLocalStorage';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { LogOut } from '../services/LogOut';

    
const Employee = () => {
       
    
   


    const [jwt,setJwt] = useLocalState("", "jwt");
    
    

    if(jwt){
        const role=UseGetRoleFromJWT(jwt);
        if(role === "USER"){
            window.location.href = "/user";
            return <div>Loading....</div>
         
        }else if(role === "ADMIN"){
            window.location.href = "/admin";
            return <div>Loading....</div>
        }

        else if(role !== "EMPLOYEE"){
            window.location.href = "/welcome";
            return <div>Loading....</div>
        }



      }
  
      function UseGetRoleFromJWT(jwt){
          if(jwt){
              try{
            const decoded = jwtDecode(jwt);
            console.log(decoded.authorities);
            return decoded.roles[0].authority;
              } catch(error){ window.location.href = "/welcome";
              return <div>Loading....</div>
              };}
          
          else{
            return "";
          }
      
          
    
          }
  





    return (
        <Container className="justify-content-md-center">
            <Navbar bg="dark" data-bs-theme="dark" fixed="top">
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
                            <Navbar.Brand>Djelatnik</Navbar.Brand>
                        </Navbar.Collapse>
                    </Col>
                    <Col xs={1}>
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <NavDropdown title="Opcije" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/settings">Postavke</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={() => LogOut()}>Odjavi se</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Col>
                </Container>
            </Navbar>
        </Container>
    );
}
export default Employee;