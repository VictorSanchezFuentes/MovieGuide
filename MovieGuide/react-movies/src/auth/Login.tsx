import axios from "axios";
import AuthForm from "./AuthForm";
import { authenticationResponse, userCredentials } from "./auth.models";
import { urlAccounts } from "../endpoints";
import { useContext, useState } from "react";
import DisplayErrors from "../utils/DisplayErrors";
import { ObjectError } from "../global";
import { getClaims, saveToken } from "./HandleJWT";
import AuthenticationContext from "./AuthenticationContext";
import { useNavigate } from "react-router-dom";

export default function Login(){

    const [errors, setErrors] = useState<string[]>([]);
    const {update} = useContext(AuthenticationContext);
    const navigate = useNavigate();


    async function login(credentials:userCredentials) {
        
        const response = await axios
            .post<authenticationResponse>(`${urlAccounts}/login`, credentials)
            .catch(function(error){
                if(error.response){
                    
                    let responseErrors = error.response.data;
                    let objectErrors: ObjectError[] = responseErrors;
                    // let errorValues = Object.values(objectErrors);


                    let arrayErrors: string[] = objectErrors.map(a => a.description);
                    setErrors(arrayErrors);
                }
        });
        if(response!.data){
            setErrors([]);
            saveToken(response!.data);
            update(getClaims());
            navigate("/");
        }
        
        
        
    }



    return(
        <>
            <h3>Login</h3>
            <DisplayErrors errors={errors} />
            <AuthForm  model={{email: "", password: ""}}
                onSubmit={async values => await login(values)}/>
        
        </>
    )
}