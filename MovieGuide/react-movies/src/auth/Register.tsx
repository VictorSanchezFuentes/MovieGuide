import axios from "axios";
import { authenticationResponse, userCredentials } from "./auth.models";
import { urlAccounts } from "../endpoints";
import { useContext, useState } from "react";
import DisplayErrors from "../utils/DisplayErrors";
import AuthForm from "./AuthForm";
import { ObjectError } from "../global";
import { getClaims, saveToken } from "./HandleJWT";
import AuthenticationContext from "./AuthenticationContext";
import { useNavigate } from "react-router-dom";

export default function Register(){

    const [errors, setErrors] = useState<string[]>([]);
    const {update} = useContext(AuthenticationContext);
    const navigate = useNavigate();

    async function register(credentials: userCredentials){
        
                const response = await axios
                    .post<authenticationResponse>(`${urlAccounts}/create`, credentials)
                    .catch(function(error){
                        if(error.response){
                            let objectErrors: ObjectError[] = error.response.data

                            let arrayErrors: string[] = objectErrors.map(a => a.description);
                            // const arrayErrors: string[] = ["description"].map(k => error.response.data[k]);
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
            <h3>Register</h3>
            <DisplayErrors  errors={errors} />
            <AuthForm
                model={{email: "", password: ""}}
                onSubmit={async values => await register(values)}
            />
        
        </>
    )
}

