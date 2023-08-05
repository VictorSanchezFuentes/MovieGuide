import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import "./Ratings.css"
import AuthenticationContext from "../auth/AuthenticationContext";
import Swal from "sweetalert2";

export default function Ratings(props: ratingsProp){
    
    const [maximumValueArr,setMaximumValueArr] = useState<number[]>([]);
    const [selectedValue, setSelectedValue] = useState(props.selectedValue);
    const {claims} = useContext(AuthenticationContext);

    useEffect(() =>{
        setMaximumValueArr(Array(props.maximumValue).fill(0));

    }, [props.maximumValue])

    function handleMouseOver(rate: number){
        setSelectedValue(rate);
    }
    
    function handleClick(rate: number){
        const userIsLoggedIn = claims.length > 0;
        if(!userIsLoggedIn){
            Swal.fire({title: "ERROR", text: "You need to log in" , icon: "error"});
        }

        setSelectedValue(rate);
        props.onChange(rate);
    }

    
    return(
        <>
            {maximumValueArr.map((_,index) => <FontAwesomeIcon 
                onMouseOver={() => handleMouseOver(index+1)}
                onClick={() => handleClick(index+1)}
                icon="star" key={index} 
                className={`fa-lg pointer ${selectedValue >= index+1 ? "checked" : null}`}
            />)}
        </>
    )
}


interface ratingsProp {
    maximumValue: number;
    selectedValue: number;
    onChange(vote: number): void;

}