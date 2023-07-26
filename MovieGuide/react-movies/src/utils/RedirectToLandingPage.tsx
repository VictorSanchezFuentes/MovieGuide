import { Navigate } from "react-router-dom";


export default function RedirectFomLandingPage(){
    return (
        <Navigate to="/" replace={true} />
      )
}