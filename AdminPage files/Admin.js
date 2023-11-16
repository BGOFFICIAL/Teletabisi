import React from "react";
import './admin.css';

import {Button, Table, Form, InputGroup} from 'react-bootstrap';

import Employees from './emlpoyees';
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
function Admin(){
    let history = useNavigate();
    const handleDelete = (id) =>{
        var index = Employees.map(function(e){
            return e.id;
            /* Promijeni da više nije zaposlenik */
        }).indexOf(id);
        Employees.splice(index,1);
        history('/admin');   
    }
    /*dodati funkciju za dodavanje novih zaposlenika*/
    /*Dodati funkciju za filtriranje*/
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
                            <th colspan="4" class="tablename">
                                Zaposlenici
                            </th>                            
                            <th colspan="2" >
                                <form action="" method="post" > {/*Povezati onSubmit sa funkcijomn za dodavanje zaposlenika*/}
                                    <label for="imeprez">Pretraži:  </label>
                                    <input type="text" id="employSearch" name="imeprez"/>
                                    <button type="submit" class="removebutton">Dodaj</button>
                                </form>
                            </th>
                        </tr>
                        <tr>
                            <th>Ime</th>
                            <th>Prezime</th>
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
                                  <tr key={item.id}>
                                    <td>{item.Name}</td>
                                    <td>{item.Surname}</td>
                                    <td>{item.DateOfBirth}</td>
                                    <td>{item.DateOfEmployement}</td>
                                    <td>{item.Sex}</td>
                                    <td><button class="removebutton" onClick={() => handleDelete(item.id)}>Ukloni</button> {/*Zove funkciju HandleDelete za micanje korisnika iz zaposlenika*/}
                                    </td>
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
                                <form method="get" onSubmit={(e) => setSearch(e.target.value)}> {/*Povezuje na funkciju za filtriranje*/}
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
                            <th>Datum rođenja</th>
                            <th>Datum zapošljivanja</th>
                            <th>Spol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Employees && Employees.length > 0 ? (
                                Employees.filter((item) => {
                                    {/*Filter da gleda spol, godina rođenja, godina zapošljivanja*/}
                                }).map((item) => (
                                  <tr key={item.id}>
                                    <td>{item.Name}</td>
                                    <td>{item.Surname}</td>
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