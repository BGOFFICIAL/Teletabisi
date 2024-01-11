import React from 'react';
import LogOut from './LogOut';
import { jwtDecode } from 'jwt-decode';
import { useLocalState} from '../util/useLocalStorage';





function UseGetRoleFromJWT(jwtpom) {
  if (jwtpom) {
    const decoded = jwtDecode(jwtpom);
    console.log(decoded.authorities);

    return decoded.roles[0].authority;
  }
  else {
    return null;
  }
}


function Waiter(lokacija) {
  if(window.location.pathname !== lokacija)
  return <div>Loading...</div>
}


function Navigation(jwt) {
  

  
  const [roles, setRoles] = useLocalState(UseGetRoleFromJWT);



    if (jwt) {
      
      
        try {
          const role = UseGetRoleFromJWT(jwt);
          
    
          if (role=== "ADMIN") {
            window.location.href = "/admin";


            return <div>Loading....</div>
          }
          else if (role=== "USER") {
            window.location.href = "/user";


            return <div>Loading....</div>
          }
    
          else if(role=== "EMPLOYEE"){
            window.location.href = "/employee";


            return <div>Loading....</div>
          }

         else{
          if(window.location.pathname !== "/login" || window.location.pathname !== "/register" || window.location.pathname !== "/welcome" ){
            window.location.href = "/welcome";


            return <div>Loading....</div>}
          }
    
    
        } catch (error) {
          LogOut();
          return <div>Loading....</div>
        };
      }
     
      }


export {Navigation,Waiter};