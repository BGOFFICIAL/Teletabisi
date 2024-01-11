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

function App() {


 
  

  
  const [jwt, setJwt] = useLocalState();
  const [roles, setRoles] = useState('');
  
  useEffect(() => {
    function updateRoles() {
      if (jwt) {
        const decoded = jwtDecode(jwt);
        const authority = decoded.roles[0].authority;
        console.log("Ovo vracas:" + authority);
        setRoles(authority);
        localStorage.setItem('roles', authority); // update roles in localStorage
      } else {
        setRoles("");
        localStorage.setItem('roles',"no role"); // remove roles from localStorage
      }
    }
  
    updateRoles();
  }, [jwt]); // Depend on jwt



 

  
  /*const [jwt, setJwt] = useLocalState('jwt','');
  const [roles, setRoles] = useState('');

  function UseGetRoleFromJWT() {
    if (jwt) {
      const decoded = jwtDecode(jwt);
      console.log("Ovo vracas:" + decoded.roles[0].authority);
      return decoded.roles[0].authority;
    }

     else {
      return "nema rolu";
    }
  }
*/

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/welcome" />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/user" element={<User />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/employee" element={<Employee />} />
      </Route>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
