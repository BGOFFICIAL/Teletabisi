import { useLocalState } from '../util/useLocalStorage';
import { Navigate ,Outlet} from 'react-router-dom';
import ajax from '../services/fetchGenerator';

function ValidateToken() {
    
    const [jwt,setJwt] = useLocalState("", "jwt");
    const [isLoading,setIsLoading] = useLocalState(true);
    const [isValid,setIsValid] = useLocalState(null);
    
    console.log("radi");
    if(jwt){
        console.log("usao");
        
        ajax("http://localhost:8080/api/v1/auth/validate","GET",jwt,jwt).then(isValid => {
        setIsValid(isValid);
        setIsLoading(false);

        });
    }
    else{
        return <Navigate to="/welcome"/>;
    }
    return isLoading ? <div>Loading...</div> : isValid=== true ? <Outlet/> : <Navigate to="/welcome"/>;

}

export default ValidateToken;