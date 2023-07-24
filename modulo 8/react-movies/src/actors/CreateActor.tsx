import ActorForm from "./ActorForm";
import { actorCreationDTO } from "./actors.model";
import { useState } from "react";
import DisplayErrors from "../utils/DisplayErrors";
import { convertActorToFromData } from "../utils/FormsDataUtils";
import axios from "axios";
import { urlActors } from "../endpoints";
import { useNavigate } from "react-router-dom";

export default function CreateActor(){

    const [errors,setErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    async function create(actor: actorCreationDTO){
        try{
            
            const formData = convertActorToFromData(actor);
            console.log(formData);
            await axios
            // .post(urlActors, actor);
            ({
                method:"post",
                url: urlActors,
                data: formData,
                headers: {"Content-Type": "multipart/form-data"}
            });
            navigate("/actors");
        }
        catch(error){
            //@ts-ignore
            if(error  && error.response){
                //@ts-ignore
                setErrors(Array.from(error.response.data));
            }

        }
    }

    return (
        <>
            <h3> Create Actor </h3>
            <DisplayErrors errors={errors} />
            <ActorForm 
                //@ts-ignore
                model={{name: "", dateOfBirth: undefined}}
                onSubmit={async values => await create(values)}
            />
        </>
    )

}
