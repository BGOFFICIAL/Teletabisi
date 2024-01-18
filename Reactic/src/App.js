import "./App.css";

import { useLocalState } from "./util/useLocalStorage";
import { useState, useEffect } from "react";
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
import Search from "./Sites/Search/Search";
import Mail from "./Sites/Mail/Mail";
import ForgotPassword from "./Sites/ForgotPassword/forgotpassword";
import AdminEmployee from "./Sites/AdminEmployee/AdminEmployee";

function App() {

  const [jwt, setJwt] = useLocalState();
  const [roles, setRoles] = useState('');


  return (
    <Routes>
      <Route path="/*" element={<Navigate to="/welcome" />} />
      <Route element={
        <PrivateRoutes />}>
        <Route path="/user" element={<User />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/AddEquipment" element={<AddEquipment />} />
        <Route path="/AddRooms" element={<AddRooms />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Mail" element={<Mail />} />
        <Route path="/adminemployee" element={<AdminEmployee />} />

      </Route>
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;