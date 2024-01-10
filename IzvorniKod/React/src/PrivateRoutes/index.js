import React from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { Navigate ,Outlet} from 'react-router-dom';

const PrivateRoutes = () => {
    
    const [jwt,setJwt] = useLocalState("", "jwt");
    
    return jwt ? <Outlet/> : <Navigate to="/welcome"/>;
};

export default PrivateRoutes;