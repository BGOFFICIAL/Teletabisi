import React from 'react';
import LogOut from './LogOut';
import { jwtDecode } from 'jwt-decode';
import { useLocalState} from '../util/useLocalStorage';








function Navigacija(jwt) {
  

  
  try{


    if (jwt) {
          const decoded = jwtDecode(jwt);
          const roles = decoded.roles;

          if(roles && roles.length > 0){
            const role = roles[0];
            localStorage.setItem("roles", role);
            console.log("role :" + role);
          } else{
            console.log("No roles found in token");
            localStorage.setItem("roles","no role"); // remove roles from localStorage
          } 
        } else{
            localStorage.setItem("roles","no role"); // remove roles from localStorage
          }
          
          console.log("roles:" + localStorage.getItem("roles"));
          console.log("path:" + window.location.pathname);
    
          if (localStorage.getItem("roles")=== "ADMIN" && window.location.pathname !== "/admin") {
            window.location.href = "/admin";


            return <div>Loading....</div>
          }
          if (localStorage.getItem("roles")=== "USER" && (window.location.pathname !== "/user" || window.location.pathname === "/welcome") ) {
            window.location.href = "/user";


            return <div>Loading....</div>
          }
    
          if(localStorage.getItem("roles")=== "EMPLOYEE" && window.location.pathname !== "/employee"){
            window.location.href = "/employee";


            return <div>Loading....</div>
          }


          

         if((localStorage.getItem("roles")!=="USER" && localStorage.getItem("roles")!=="EMPLOYEE" && localStorage.getItem("roles")!=="ADMIN") && (window.location.pathname !== "/login" && window.location.pathname !== "/register" && window.location.pathname !== "/welcome") ){
            window.location.href = "/welcome";

            localStorage.setItem("jwt","");


            return <div>Loading....</div>
          }
        }catch(error){
          localStorage.setItem("jwt","");
          
          console.log("errorcina");
        }
      }
export default Navigacija;