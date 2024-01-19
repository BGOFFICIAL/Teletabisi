import React from "react";



function LogOut() {
 
  
  localStorage.setItem("jwt", "");
  localStorage.setItem("roles", "no role");
  window.location.reload();
  
}

export default LogOut ;