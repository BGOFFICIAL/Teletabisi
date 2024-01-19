import React from 'react';
import LogOut from './LogOut';
import { jwtDecode } from 'jwt-decode';
import { useLocalState } from '../util/useLocalStorage';








function Navigacija() {
  const roles = localStorage.getItem("roles");
  const [jwt, setJwt] = useLocalState("", "jwt");
  const Admin="ADMIN";
  const Employee="EMPLOYEE";
  const User="USER";
  const AdminEmployee="ADMINEMPLOYEE";
  const Inactive="INACTIVE";


  
  



  try {



    if (jwt) {
      const decoded = jwtDecode(jwt);
      const rolespom= decoded.roles;
      

      if (rolespom&& rolespom.length > 0) {
        const role = rolespom[0];
        

        localStorage.setItem("roles", '"'+role+'"');
        alert("role:" + role);
         
        // console.log("role :" + role);
      } else {
        // console.log("No roles found in token");
        localStorage.setItem("roles","no role"); // remove roles from localStorage
      }
    } else {
      localStorage.setItem("roles","no role");  // remove roles from localStorage
    }

    // console.log("roles:" + localStorage.getItem("roles"));
    // console.log("path:" + window.location.pathname);

    console.log("Usao u navigacija");
    alert("roles nakon:" + roles);


    if ((roles ===User  || roles === Employee || roles === Admin || roles ===AdminEmployee) && (window.location.pathname === "/login" || window.location.pathname === "/register" || window.location.pathname === "/welcome" || window.location.pathname === "/forgotpassword")) {
      
      alert("usao");
      LogOut();

   


      return <div>Loading....</div>
    }
    

    if (roles !== Admin && window.location.pathname === "/admin") {
      alert("usao u admin");
      LogOut();


      
    }
    if (roles !== User && window.location.pathname === "/user" ) {
      console.log("Usao u user");
      console.log(roles);
      LogOut();


     
    }

    if (roles !== Employee && window.location.pathname === "/employee") {

      LogOut();
      


      
    }

    if (roles !== AdminEmployee && window.location.pathname === "/adminemployee") {

      LogOut();
     
    }



    console.log("Zavrsio sa navigacijom");
   
  } catch (error) {
    console.log("usao u catch");
    alert(roles===Admin);
    localStorage.setItem("jwt", "");
    localStorage.setItem("roles", "no role");
   

    //   console.log("errorcina");
  }
}
export default Navigacija;