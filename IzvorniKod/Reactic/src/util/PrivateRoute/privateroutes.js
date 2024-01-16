import React from "react";
import { useLocalState } from "../useLocalStorage";
import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import ajax from "../../services/fetchGenerator";







const PrivateRoutes = () => {  
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isLoading,setIsLoading] = useState(true);
  const [isValid,setIsValid] = useState(null);

  if(jwt){
    ajax(`http://localhost:8080/api/v1/auth/validate?token=${jwt}`,"GET",jwt).then(isValid => {
      setIsValid(isValid);
      setIsLoading(false);
    });
  }else{
    return <Navigate to="/welcome" />;
  }

  return isLoading ? (<div>Loading...</div>) : isValid === true ? (<Outlet />) : (<Navigate to="/welcome" />);


  
};

export default PrivateRoutes;