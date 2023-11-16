import React from "react";
import './admin.css';

import {Button, Table, Form, InputGroup, Alert} from 'react-bootstrap';

import Employees from './emlpoyees';

function Admin(){
    
    const handleDelete = async (e) =>{      
        e.preventDefault();

        const buttonid = e.currentTarget.id;
        
        const response = await fetch('http://localhost:8080/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({buttonid}),
        });
    }

    const AddEmploy = async (e) => { /*Slanje dodavanja zaposlenika*/
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        const jsonObject = {};

        formData.forEach((value, key) => {
            jsonObject[key] = value;

        });
        
        const response = await fetch('http://localhost:8080/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonObject),
        });

    }

    const handleSubmit = async (e) => { /*Traženje filtera*/
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        try {
            const jsonObject = {};
            formData.forEach((value, key) => {
                jsonObject[key] = value;
            });
            const response = await fetch('http://localhost:8080/api/', {
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
      };
    

    return (
        <div calss="container">
            <div class="header"> 
                <img src="./logo192.png" alt="" class="image"/>
                <button>Postavke</button>
                <button>Odjavi se</button>
            </div>
            <div class="employee">
                <Table>
                    <thead>
                        <tr>
                            <th colspan="5" class="tablename">
                                Zaposlenici
                            </th>                            
                            <th colspan="2" >
                                <form action="" method="post" onSubmit={AddEmploy}> {/*Povezati onSubmit sa funkcijomn za dodavanje zaposlenika*/}
                                    <label for="imeprez">Pretraži:  </label>
                                    <input type="text" id="employSearch" name="imeprez"/>
                                    <button type="submit" class="removebutton">Dodaj</button>
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
                        {
                            Employees && Employees.length > 0 ? (
                                Employees.map((item) => (   
                                  <tr key={item.id}>    {/*Dodati filter da je zaposlenik*/}
                                    <td>{item.Name}</td>
                                    <td>{item.Surname}</td>
                                    <td>{item.Mail}</td>
                                    <td>{item.DateOfBirth}</td>
                                    <td>{item.DateOfEmployement}</td>
                                    <td>{item.Sex}</td>
                                    <td><button class="removebutton" id={item.id} onClick={handleDelete}>Ukloni</button> {/*Zove funkciju HandleDelete za micanje korisnika iz zaposlenika*/}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="6">Nema zaposlenika</td>
                                </tr>
                              )
                        }
                    </tbody>
                    
                </Table>
            </div>
            <div class="stats">
            <Table>
                    <thead>
                        <tr>
                            <th colspan="1" class="tablename">
                                Statistika
                            </th>
                            
                            <th colspan="5" >
                                <form method="get" onSubmit={handleSubmit}> {/*Povezuje na funkciju za filtriranje*/}
                                    <div class="filters">
                                        <label for="sex">Spol:  </label>                                 
                                        <label><input type="radio" value="Male" name="sex"/>Muško </label>
                                        <label><input type="radio" value="Female" name="sex"/>Žena </label>
                                    </div>
                                    <div class="filters">
                                        <label for="yearofbith">    Datum rođenja:  </label>
                                        <input type="number" id="statsBirth" name="yearofbith"/>
                                    </div>     
                                    <div class="filters">
                                        <label for="yearofemp">    Datum zapošljivanja:  </label>
                                        <input type="number" id="statsEmploy" name="yearofemp"/>
                                    </div>                                                    
                                    <div class="filters">
                                        <button type="submit" class="removebutton">Pretraži</button>
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
                        {
                            Employees && Employees.length > 0 ? (
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
                              )
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Admin;