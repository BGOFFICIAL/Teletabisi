import React from "react";

function LogOut() {
  let jwtToken = localStorage.getItem("jwt");
  jwtToken = '""';
  localStorage.setItem("jwt", jwtToken);

  let roles = localStorage.getItem("roles");
  roles = '""';
  localStorage.setItem("roles", roles);

  window.location.reload();
}

export default LogOut ;
