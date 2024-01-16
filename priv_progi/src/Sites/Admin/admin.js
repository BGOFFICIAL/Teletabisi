import React from "react";
import LogOut from "../../services/LogOut";
import { useLocalState } from "../../util/useLocalStorage";
import { jwtDecode } from "jwt-decode";
import "./admin.css";
import { Button, Table, Form, InputGroup, Alert } from "react-bootstrap";
import FormData from "form-data";
import { useNavigate } from "react-router-dom";
import Navigacija from "../../services/navigate";

const Admin = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  Navigacija(jwt);
  const navigate = useNavigate();
  /*const role = UseGetRoleFromJWT(jwt);
  if (jwt) {
    if (role === "USER") {
      window.location.href = "/user";
      return <div>Loading....</div>;
    } else if (role === "EMPLOYEE") {
      window.location.href = "/employee";
      return <div>Loading....</div>;
    } else if (role !== "ADMIN") {
      window.location.href = "/welcome";
      return <div>Loading....</div>;
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
        return <div>Loading....</div>;
      }
    } else {
      return "";
    }
  }*/

  const Privzapis = {
    name: "",
    surname: "",
    email: "",
    date_Of_Birth: "",
    start_date: "",
    gender: "",
  };

  console.log("idem dalje");

  const handleDelete = async (e) => {
    e.preventDefault();

    const buttonid = e.currentTarget.id;

    fetch("http://localhost:8080/api/v1/auth/remove/employee", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      method: "POST",
      body: JSON.stringify({ buttonid }),
    });
  };

  /* const AddEmploy = async (e) => { 
          e.preventDefault();
          const form = e.target;
          const formData = new FormData(form);
          
          const jsonObject = {
            "username": e.target.value
          };
  
          formData.forEach((value, key) => {
              jsonObject[key] = value;
  
          });
          
         const response = 
          await fetch("http://localhost:8080/api/v1/auth/add/employee", {
             
              headers: {
                  'Content-Type': 'application/json',
                  
              }, method: 'POST',
              
              body: JSON.stringify(jsonObject),
          });
            if(response.status === 200){
                console.log("200 radi");
                const responseBody = await response.json();
                if (responseBody !== null) {
                    console.log("ime promijena"+responseBody);
                    responseBody.username ="";
                    console.log("ime promijena"+responseBody);
                    
                }
            }
           

            
        };*/

  const AddEmploy = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const jsonObject = {
      username: e.target.value,
    };

    formData.forEach((value, key) => {
      jsonObject[key] = value;
    });

    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/auth/add/employee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonObject),
        }
      );

      if (response.ok) {
        // Parse the JSON body
        const responseBody = await response.json();
        Privzapis.name = responseBody.name;
        Privzapis.surname = responseBody.surname;
        Privzapis.email = responseBody.email;
        Privzapis.date_Of_Birth = responseBody.date_Of_Birth;
        Privzapis.start_date = responseBody.start_date;
        Privzapis.gender = responseBody.gender;
        console.log("Response body:", Privzapis);

        // Now you can work with the responseBody object
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  /*const handleSubmit = async (e) => {
          e.preventDefault();
          const form = e.target;
          const formData = new FormData(form);
          try {
              const jsonObject = {};
              formData.forEach((value, key) => {
                  jsonObject[key] = value;
              });
              fetch("http://localhost:8080/api/filter/role", {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(jsonObject),
              });
  
              if (response.ok) {
                  console.log('Uspijesno filtrirano');
              } else {
                  console.error('Nema tog korisnika');
              }
          } catch (error) {
              console.error('Error:', error.message);
          }
        };*/

  return (
    <div className="container">
      <div className="header">
        <img src="./logo192.png" alt="" className="image" />
        <button
          id="settings"
          type="button"
          onClick={() => (window.location.href = "/settings")}
        >
          Postavke
        </button>
        <button id="logout" type="button" onClick={() => LogOut()}>
          Odjavi se
        </button>
      </div>
      <div className="employee">
        <Table>
          <thead>
            <tr>
              <th colSpan="4" className="tablename">
                Zaposlenici
              </th>
              <th colSpan="3">
                <form action="" method="post" onSubmit={AddEmploy}>
                  {" "}
                  {}
                  <label for="username">Pretraži: </label>
                  <input type="text" id="employSearch" name="username" />
                  <button type="submit" className="removebutton">
                    Dodaj
                  </button>
                </form>
              </th>
            </tr>
            <tr>
              <th>Ime</th>
              <th>Prezime</th>
              <th>E-mail</th>
              <th>Datum rođenja</th>
              <th>Datum zapošljivanja</th>
              <th>Spol</th>
              <th>Ukloni zaposlenika</th>
            </tr>
          </thead>
          <tbody>
            {"Employees" && "Employees.length" > 0 ? (
              "Employees".map((item) => (
                <tr>
                  <td>{item.responseBody.name}</td>
                  <td>{item.responseBody.surname}</td>
                  <td>{item.responseBody.email}</td>
                  <td>{item.responseBody.date_of_birth}</td>
                  <td>{item.responseBody.start_date}</td>
                  <td>{item.responseBody.gender}</td>
                  <td>
                    <button
                      className="removebutton"
                      id={item.Mail}
                      onClick={handleDelete}
                    >
                      Ukloni
                    </button>{" "}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Nema zaposlenika</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div className="stats">
        <Table>
          <thead>
            <tr>
              <th colSpan="1" className="tablename">
                Statistika
              </th>

              <th colSpan="5">
                <form method="get" /*</th>onSubmit={handleSubmit}*/>
                  {" "}
                  {}
                  <div className="filters">
                    <label for="sex">Spol: </label>
                    <label>
                      <input type="radio" value="Male" name="sex" />
                      Muško{" "}
                    </label>
                    <label>
                      <input type="radio" value="Female" name="sex" />
                      Žena{" "}
                    </label>
                  </div>
                  <div className="filters">
                    <label for="yearofbith"> Datum rođenja: </label>
                    <input type="number" id="statsBirth" name="yearofbith" />
                  </div>
                  <div className="filters">
                    <label for="yearofemp"> Datum zapošljivanja: </label>
                    <input type="number" id="statsEmploy" name="yearofemp" />
                  </div>
                  <div className="filters">
                    <button type="submit" className="removebutton">
                      Pretraži
                    </button>
                  </div>
                </form>
              </th>
            </tr>
            <tr>
              <th>Ime</th>
              <th>Prezime</th>
              <th>E-mail</th>
              <th>Datum rođenja</th>
              <th>Datum zapošljivanja</th>
              <th>Spol</th>
            </tr>
          </thead>
          <tbody>
            {/*Employees && Employees.length > 0 ? (
                                  Employees.map((item) => (
                                    <tr key={item.id}>
                                      <td>{item.Name}</td>
                                      <td>{item.Surname}</td>
                                      <td>{item.Mail}</td>
                                      <td>{item.DateOfBirth}</td>
                                      <td>{item.DateOfEmployement}</td>
                                      <td>{item.Sex}</td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="5">Nema zaposlenika koji odgovaraju uvjetima</td>
                                  </tr>
                                )*/}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Admin;
