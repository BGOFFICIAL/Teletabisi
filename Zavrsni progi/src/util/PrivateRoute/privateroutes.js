import React from "react";
import { useLocalState } from "../useLocalStorage";
import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import ajax from "../../services/fetchGenerator";
import  LogOut  from "../../services/LogOut";
import Navigacija from "../../services/navigate";
import Welcome from "../../Sites/Welcome/welcome";
import { jwtDecode } from "jwt-decode";
import { HttpStatusCode } from "axios";



const PrivateRoutes = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isLoading,setIsLoading] = useState(true);
  const [isValid,setIsValid] = useState(null);
  const [logouter,setLogouter] = useLocalState("true", "logouter");

  try{


  if(jwt){
    ajax(`http://localhost:8080/api/v1/auth/validate?token=${jwt}`,"GET",jwt).then(isValid => {
      setIsValid(isValid);
      setIsLoading(false);
    });

  }else{
    
    return <Navigate to="/welcome" />;
  }

  if(isValid===false){
    setLogouter("false");
    setJwt("");
    localStorage.setItem("roles","no role");
  }


  return isLoading ? (<div>Loading...</div>) : isValid === true ? (<Outlet />) : ( (() => {
    
    return <Navigate to="/welcome" />;
  })
  
  
  ()
  
  
  )
  
}catch(error){
  console.log("Izasao radi error");
  setLogouter("false");
  localStorage.setItem("jwt","");
    localStorage.setItem("roles","no role");
  
  <Navigate to="/welcome"/>
}
  



};










/* PrivateRoutes = () => {  
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isLoading,setIsLoading] = useState(true);
  const [isValid,setIsValid] = useState(null);
  const [roles,setRoles] = useLocalState("");


  if(jwt){
    ajax(`http://localhost:8080/api/v1/auth/validate?token=${jwt}`,"GET",jwt).then(isValid => {
      setIsValid(isValid);
      setIsLoading(false);
    });
  }else{
    LogOut();
    return <div>Loading....</div>;
  }


  if(isLoading === true){
    return <div>Loading....</div>;
  }
  else if(isLoading === false){
    if (isValid === true) {

      //funkcija Navigate
    try {
      if (jwt) {
        const decoded = jwtDecode(jwt);
        const roles = decoded.roles;
  
        if (roles && roles.length > 0) {
          const role = roles[0];
          setRoles(role);
          // console.log("role :" + role);
        } else {
          // console.log("No roles found in token");
          setRoles("no role"); // remove roles from localStorage
        }
      } else {
        setRoles("no role"); // remove roles from localStorage
      }
  
      // console.log("roles:" + localStorage.getItem("roles"));
      // console.log("path:" + window.location.pathname);
  
  
      if ((roles !== "USER" && roles !== "EMPLOYEE" && roles !== "ADMIN" && roles !== "ADMINEMPLOYEE") && (window.location.pathname !== "/login" && window.location.pathname !== "/register" && window.location.pathname !== "/welcome" && window.location.pathname !== "/forgotpassword")) {
        
    
        LogOut();
      }
      
  
      if (roles === "ADMIN" && window.location.pathname !== "/admin") {
        window.location.href = "/admin";
  
  
        
      }
      if (roles === "USER" && (window.location.pathname !== "/user" || window.location.pathname === "/welcome")) {
        window.location.href = "/user";
  
  
      
      }
  
      if (roles === "EMPLOYEE" && window.location.pathname !== "/employee") {
  
        window.location.href = "/employee";
        
  
  
        
      }
     
    } catch (error) {
      localStorage.setItem("jwt", "");
      localStorage.setItem("roles", "no role");
      window.location.href = "/welcome";
  
    }


    
    
    }
    else if(isValid === false){
      LogOut();
      
    }
  }


  return isLoading ? (<div>Loading...</div>) 
  
  
  : isValid === true ? (<Outlet />) : (<Navigate to="/welcome" />);
    
     
    ;


  
};*/

export default PrivateRoutes;