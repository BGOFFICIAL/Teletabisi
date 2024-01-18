import {
    Button, Form, Row, Col, Container, Navbar,
    Nav, InputGroup, ButtonGroup, FormLabel, ToggleButton, ToggleButtonGroup,
    NavbarText, NavDropdown, Table, Pagination, Card, Dropdown, Alert
} from 'react-bootstrap';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useLocalState } from '../../util/useLocalStorage';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import  LogOut  from '../../services/LogOut';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DateTimePicker from 'react-datetime-picker';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';



const Admin = () => {

     const [jwt, setJwt] = useLocalState("", "jwt");

    
     

    //nekoliko funkcija da mijenjas stranice tablice

    const [EmpPage, setEmpPage] = useState(1);
    const [FilterPage, setFilterPage] = useState(1);
    
    const [empItems, setempItems] = useState([]);
    const [filterItems, setfilterItems] = useState([]);

    const [selectedshift, setSelectedshift] = useState();
    const [usernameS, setusernameS] = useState('');
    const [usernameA, setusernameA] = useState(''); 

    const [shiftfilter, setshiftFilter] = useState(undefined);
    const [spolfilter, setSpolFilter] = useState('');
    const [godfilter, setGodFilter] = useState();
    const [filterOn, setFilterOn] = useState(1);
    const [updateEfect,setUpdateEffect] = useState(false); 
    const options = [
        { value:1, label: 'Neparni ujutro' },
        { value:2, label: 'Neparni popodne' },
      ];
      const options2 = [
        { value:'EMPLOYEE', label: 'EMPLOYEE' },
        { value:'ADMINEMPLOYEE', label: 'ADMINEMPLOYEE' },
      ];
    const itemsPerPage = 10;


    //fiksna lista
    const [data,setData] = useState ([]);
    

    const indexOfLastItem = EmpPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const indexOfLastItem2 = FilterPage * itemsPerPage;
    const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage;
    //tu bi se negdje trebalo spremiti u data1 pomoću fetcha koji ima listu svih empolyee
    useEffect(() => {
        const fetchData = async () => {
         try{
            const response = await fetch("http://localhost:8080/api/v1/func/administration/return/employee", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${jwt}`,
                },
            });
            const jsonData = await response.json();


            if (jsonData.employeeList && Array.isArray(jsonData.employeeList)) {
                // Assuming the response contains an array under the key "employeeList"
                setData(jsonData.employeeList);
            } else {
                console.error('Invalid response format:', jsonData);
            }


            //setData(jsonData);
           
            //setdata1(jsonData);


         } catch (error){
            console.error('Empty',error);
        }
        
        
    };
    fetchData();

    setempItems(data.slice(indexOfFirstItem, indexOfLastItem));
    if(filterOn===1){
        setfilterItems(data.slice(indexOfFirstItem2, indexOfLastItem2));
    }
        
        
    }, [EmpPage,FilterPage,jwt,data, updateEfect]);
    
    

    const handleshiftFChange = (item) => {
        setshiftFilter(item.target.value);
    };
    const handleSpolFChange = (item) => {
        setSpolFilter(item.target.value);
    };
    const handleGodFChange = (item) => {
        setGodFilter(item.target.value);
    };

    const handleshiftChange = (item) => {
        setSelectedshift(item.target.value);
    
    };

    const handleUsernameAChange = (item) => {
        setusernameA(item.target.value);
    };
    const handleusernameSChange = (item) => {
        setusernameS(item.target.value);
    };
    //prijenos iz jedne u drugu tablicu
    const handlePageChange = (pageNumber) => {
        setEmpPage(pageNumber);
    };
    const handleFilterPageChange = (pageNumber) => {
        setFilterPage(pageNumber);
    };  

    const handleAdd = async (e) => {
        e.preventDefault();
        
        if(usernameS !== '' && (selectedshift !== undefined && selectedshift !== null && selectedshift !== '')){
            
            try{
            
                const response = await
                fetch("http://localhost:8080/api/v1/func/administration/add/employee", {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${jwt}`,

                },
                method: "POST",
                mode: 'cors',
                body: JSON.stringify({
                    username: usernameS,
                    shift: selectedshift
                    
                }),
                });

                if(response.ok)
                console.log("Uspješno dodan zaposlenik!");
            
            }catch(error){
                console.error('Empty',error);
            }

          
        }else{
            Alert("Ispunite sva polja!");
        }
    

        
    
        

        //fetch post username, selectedshift - šalje username i smjenu koju ce imat
        //alert("ID smjene: " + selectedshift +" Username: "+ usernameS);
    };

    const handleAddAdmin = () =>{



        //http:localhost:3000/api/v1/func/administration/add/adminemployee
        //fetch post username, selectedshift
    };

    const handleRemove = async (item) => {

        try{
        
        const response = await
        fetch("http://localhost:8080/api/v1/func/administration/remove/employee", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,

        },
        mode: 'cors',
        body: JSON.stringify({
            username: item.username,
            shift: item.shift,
        }),
    });
    if(response.ok)
    console.log("Uspješno uklonjen zaposlenik!");

}catch(error){
    console.error('Empty',error);}
};


        
     

    const handleFilter = async(e) =>{
        e.preventDefault();
        setFilterOn(2);
        console.log(shiftfilter + " " + spolfilter + " " + godfilter);
        const filteredItems = data.filter((item) => {
            console.log((item.shift === shiftfilter || !shiftfilter)) 
            
                return (
                (item.shift === shiftfilter || !shiftfilter) &&
                (item.gender === spolfilter || !spolfilter) &&
                (item.startDate.includes(godfilter) || !godfilter)
                );
            });
            
            setfilterItems([]);
            
            setfilterItems(filteredItems);

            setFilterPage(1);
            filterItems.map((item) => (

                console.log(item.shift + " " + item.gender + " " + item.startDate)
            ));
            //alert("shift:" + filterItems.shiftfilter + " Spol: " + spolfilter+ " Godina Zapošljivanja: "+godfilter);
        };
    const handleFilterReset = async (e) =>{
        e.preventDefault(); 
        setFilterOn(1);
        setshiftFilter ('');
        setSpolFilter ('');
        setGodFilter (undefined);
    };
    const setChangedshift = async (item) =>{
        try{
        const response = await
        fetch(`http://localhost:8080/api/v1/func/administration/change-shift/${item.target.id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,

        },
        mode: 'cors',
        body: JSON.stringify({
            
            shift: item.target.value,
        }),
    });

    if(response.ok)
    console.log("Uspješno promijenjena smjena!");    
    }catch(error){
        console.error('Empty',error);}
        
        
    };


    const handleAktiviranje = () =>{
        //Fetch post - username
    };

    const setChangedrole = async (item) =>{
        console.log("username koji saljem  " + item.target.id);
        console.log(item);
        if(item.target.value === 'EMPLOYEE'){
            try{
                const response = await
                fetch(`http://localhost:8080/api/v1/func/administration/remove/adminemployee`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
        
                },
                mode: 'cors',
                body: JSON.stringify({
                    username: item.target.id,
                }),
            });
        
            if(response.ok)
            console.log("Uspješno promijenjen role!");    
            }catch(error){
                console.error('Empty',error);}
            

        }else if (item.target.value === 'ADMINEMPLOYEE'){
        try{
            const response = await
            fetch(`http://localhost:8080/api/v1/func/administration/add/adminemployee`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
    
            },
            mode: 'cors',
            body: JSON.stringify({
                username: item.target.id,
            }),
        });
    
        if(response.ok)
        console.log("Uspješno promijenjen role!");    
        }catch(error){
            console.error('Empty',error);}
        }
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
            <Container className='text-center'>
                <Button style={{ marginRight: '0.5rem' }} href='/AddEquipment'>Dodaj opremu</Button>
                <Button style={{ marginRight: '0.5rem' }} href='/AddRooms'>Dodaj sobu</Button>
                <Button style={{ marginRight: '0.5rem' }} href='/mail'>Pošalji mail</Button>
                <Button style={{ marginRight: '0.5rem' }} href='/search'>Pretraži pacijenta</Button>
            </Container>
            
            <br></br><Card className='text-center' >
                <Card.Header>Aktiviraj korisnika</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleAktiviranje} className='mx-auto'>
                        <Form.Group as={Row} className='mb-3'>
                            <Form.Label column sm='4'>
                                Upiši username:
                            </Form.Label>
                            <Col sm='5'>
                                <Form.Control type='text' placeholder='korisničko ime' onChange={handleUsernameAChange} value={usernameA} required />
                            </Col>
                            <Col sm='2'>
                                <Button type='submit'>Aktiviraj</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card> <br></br> 
            
            <Card className='text-center'>
                <Card.Header >Dodaj zaposlenika</Card.Header>
                    <Card.Body>
                        <Card.Title >Upiši podatke:</Card.Title>
                        
                            <Form className='no-gutters' >
                                <Row>
                                    <Col>
                                        <Form.Label>Smjena: </Form.Label>
                                        <Form.Check
                                            inline
                                            label="Neparni Ujutro"
                                            name="group1"
                                            type={'radio'}
                                            onChange={handleshiftChange}
                                            id={1}
                                            value={1}
                                            required
                                        />
                                        <Form.Check
                                            inline
                                            label="Neparni Popodne"
                                            name="group1"
                                            type={'radio'}
                                            onChange={handleshiftChange}
                                            id={2}
                                            value={2}
                                            required
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Group as={Row} className='mb-3'>
                                            <Form.Label column sm='3'>
                                            Upiši username:
                                            </Form.Label>
                                            <Col sm='8'>
                                            <Form.Control type='text' placeholder='korisničko ime' onChange={handleusernameSChange} value={usernameS} required/>
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button type='submit' onClick={handleAdd} style={{ marginRight: '0.5rem' }}>Dodaj kao zaposlenika</Button>
                                       
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
                            <th>Pozicija</th>
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
                                <td>
                                    {item.username}
                                    <Form.Select onChange={(item) => setChangedrole(item)} value={item.role} id={item.username}>
                                      {options2.map((option) => (
                                          <option key={option.value} value={option.value}>
                                              {option.label}
                                          </option>
                                      ))}

                                  </Form.Select></td>
                                <td>{item.name}</td>
                                <td>{item.surname}</td>
                                <td>{item.email}</td>
                                <td>
                                    <Form.Select onChange={(item) => setChangedshift(item)} value={item.shift} id={item.id}>
                                        {options.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                        
                                    </Form.Select>
                                </td>
                                <td>{item.startDate}</td>
                                <td>{item.gender}</td>
                                <td> <Button onClick={() => handleRemove(item)}> Ukloni </Button> </td>
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
                            <th colSpan={7} > 
                            <Form>
                            <Row>
                                    <Col>
                                        <Form.Label>Smjena: </Form.Label>
                                        <Form.Check 
                                            inline
                                            label="Neparni Ujutro"
                                            name="group1"
                                            type={'radio'}
                                            id={1}
                                            onClick={handleshiftFChange}
                                            value={1}
                                        />
                                        <Form.Check
                                            inline
                                            label="Neparni Popodne"
                                            name="group1"
                                            type={'radio'}
                                            id={2}
                                            onClick={handleshiftFChange}
                                            value={2}
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
                                            value={"muško"}
                                            onClick={handleSpolFChange}
                                        />
                                        <Form.Check
                                            inline
                                            label="F"
                                            name="group2"
                                            type={'radio'}
                                            id={`F`}
                                            value={"žensko"}
                                            onClick={handleSpolFChange}
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
                                                <Form.Control type='number' placeholder='2024' value={godfilter} onChange={handleGodFChange}/>
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Button onClick={handleFilter } style={{ marginRight: '0.5rem' }}>Filtriraj</Button>
                                        <Button onClick={ handleFilterReset}>Resetiraj</Button>
                                    </Col>
                                    
                                </Row>
                            </Form>
  
                            </th>
                        </tr>
                        
                        <tr>
                            <th>Pozicija</th>
                            <th>Ime</th>
                            <th>Prezime</th>
                            <th>E-mail</th>
                            <th>shift</th>
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
                                    <td>{item.role}</td>
                                    <td>{item.name}</td>
                                    <td>{item.surname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.shift}</td>
                                    <td>{item.startDate}</td>
                                    <td>{item.gender}</td>
                                </tr>
                            ))

                        )}
                    </tbody>
                </Table>
                <br />
                <Container className='d-flex justify-content-center'>
                    <Pagination>
                        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => index + 1).map((pageNumber) => (
                            <Pagination.Item
                                key={pageNumber}
                                active={pageNumber === FilterPage}
                                onClick={() => handleFilterPageChange(pageNumber)}>
                                {pageNumber}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Container>
            </Container>

        </Container>
    );

}
export default Admin;