import React from "react";
import { useLocalState } from "../../util/useLocalStorage";
import { useEffect, useState } from "react";
import  LogOut  from "../../services/LogOut";
import Settings from "../Settings/settings";
import { jwtDecode } from "jwt-decode";
import {
  Button,
  Form,
  Row,
  Col,
  Container,
  Navbar,
  Nav,
  InputGroup,
  ButtonGroup,
  FormLabel,
  ToggleButton,
  ToggleButtonGroup,
  NavbarText,
  NavDropdown,
} from "react-bootstrap";

const User = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  /*const [roles, setRoles] = useLocalState(UseGetRoleFromJWT);
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



useEffect(() => {
  function updateRoles() {
    if (jwt) {
      console.log(jwt);
      const decoded = jwtDecode(jwt);
      const roles = decoded.roles;

      if (roles && roles.length > 0) {
        const role = roles[0];
        console.log("Role:" + role);
        localStorage.setItem("roles", role);
        console.log("Success");
      } else {
        console.log("No roles found in token");
      }
    } else {
      localStorage.setItem("roles","no role"); // remove roles from localStorage
    }
  }

  updateRoles();
}, [jwt]);

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
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-center"
            >
              <Navbar.Brand>Pacijent</Navbar.Brand>
            </Navbar.Collapse>
          </Col>
          <Col xs={1}>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <NavDropdown title="Opcije" id="basic-nav-dropdown">
                  <NavDropdown.Item
                    onClick={() => (window.location.href = "/settings")}
                  >
                    Postavke
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => LogOut()}>
                    Odjavi se
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Container>
      </Navbar>
    </Container>
  );
};

export default User;
