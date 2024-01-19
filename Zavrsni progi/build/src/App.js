import "./App.css";

import { useLocalState } from "./util/useLocalStorage";
import { useState,useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import User from "./Sites/User/user";
import Welcome from "./Sites/Welcome/welcome";
import PrivateRoutes from "./util/PrivateRoute/privateroutes";
import Settings from "./Sites/Settings/settings";
import { jwtDecode } from "jwt-decode";
import Admin from "./Sites/Admin/admin";
import Register from "./Sites/Register/register";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import Employee from "./Sites/Employee/employee";
import Login from "./Sites/Login/Login";
import AddEquipment from "./Sites/AddEquipment/AddEquipment";
import AddRooms from "./Sites/AddRooms/AddRooms";


function App() {


 
  

  
  const [jwt, setJwt] = useLocalState();
  const [roles, setRoles] = useState('');
 
 
 /*
  useEffect(() => {
    function updateRoles() {
        if (jwt) {
            console.log(jwt);
            const decoded = jwtDecode(jwt);
            const rolespom = decoded.roles;

            if (rolespom && rolespom.length > 0) {
                const role = rolespom[0];
                
                localStorage.setItem("roles", role);
                setRoles(role);
               
            } else {
                console.log("No roles found in token");
            }
        } else {
            localStorage.setItem("roles", "no role"); // remove roles from localStorage
         
        }
    }

    const handleStorageChange = (event) => {
        if (event.key === "jwt" || event.key === "roles") {
            // Run the updateRoles function when jwt or roles change in localStorage
            updateRoles();
        }
    };

    // Add event listener to the window
    window.addEventListener("storage", handleStorageChange);

    // Run the initial updateRoles when the component mounts
    updateRoles();

    //Clean up the event listener when the component unmounts
    return () => {
        window.removeEventListener("storage", handleStorageChange);
    };
}, [jwt]);

 */
 
 
 
  /* 
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
  }, [jwt]);*/



 

  
  

  /*function UseGetRoleFromJWT() {
    if (jwt) {
      const decoded = jwtDecode(jwt);
      console.log("Ovo vracas:" + decoded.roles[0].authority);
      return decoded.roles[0].authority;
    }

     else {
      return "nema rolu";
    }
  }*/

 



  return (
    <Routes>
      <Route path="*" element={<Navigate to="/welcome" />} />
      <Route element={
      <PrivateRoutes />}>
        <Route path="/user" element={ <User /> } />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin" element={ <Admin />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/AddEquipment" element={<AddEquipment />} />
        <Route path="/AddRooms" element={<AddRooms />} />
       
   
      </Route>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;