import { useEffect,useState } from 'react';
import './App.css';
import { useLocalState } from './util/useLocalStorage';
import { Route, Routes,Navigate } from 'react-router-dom';
import User from './User';
import Welcome from './Welcome';
import PrivateRoutes from './PrivateRoutes';
import Settings from './Settings';
import {jwtDecode} from "jwt-decode";
import Admin from './Adminic';
import Register from './Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import Employee from './Employee';
import Login from './Loginic/Login';
import ForgotPassword from './ForgotPassword/forgot';







function App() {

  const [jwt,setJwt] = useLocalState("");
  const [roles,setRoles] = useLocalState(UseGetRoleFromJWT);


  function UseGetRoleFromJWT(){
    

    if(jwt){
      const decoded = jwtDecode(jwt);
      console.log(decoded.authorities);
      console.log("Ovo vracas:"+decoded.roles[0].authority);
    }
    
    if(jwt){
      const decoded = jwtDecode(jwt);
      console.log(decoded.authorities);
      
      return decoded.roles[0].authority;
    }
    else{
      return "";
    }
}
 



  
  


 

  /*useEffect(() => {
    console.log("Hello World");
    console.log("jwt is " +jwt);
    if(!jwt){
      const reqBody= {
      "username": "example",
      "password": "1234",
      };

  
 
  
      fetch("http://3.79.60.253:8080/api/v1/auth/authenticate", {
        "headers": {
        "Content-Type": "application/json",
      },
        "method": "POST",
        body: JSON.stringify(reqBody),
        })
          .then(response => response.json())
          .then(data => {
         setJwt(data.token);
        });
  }}, [jwt]);
*/

    

  return (
        
          <Routes>
             <Route path="*" element={<Navigate to="/welcome"  />} />
             <Route  element={
             <PrivateRoutes/>} >
                <Route path="/user" element={<User/>} />
                <Route path="/settings" element={<Settings/>} />    
                <Route path="/admin"  element={<Admin/>} />
                <Route path="/employee"  element={<Employee/>}/>
             </Route>
             <Route path="/welcome"  element={<Welcome/>} />
             <Route path="/login"  element={<Login/>} />
             <Route path="/register"  element={<Register/>} />
             <Route path="/forgot" element={<ForgotPassword/>}/>
             <Route path="/AddEquipment" element={<AddEquipment/>}/>
             <Route path="/AddRooms" element={<AddRooms/>}/>
        


          </Routes>
     
  );


} 

    export default App;

