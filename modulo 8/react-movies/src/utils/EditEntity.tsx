import { useEffect, useState, ReactElement } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { genreCreationDTO } from "../genres/genres.model";
import axios, { AxiosResponse } from "axios";
import DisplayErrors from "./DisplayErrors";
import Loading from "./Loading";

export default function EditEntity<TCreation, TRead>(props: editEntityProps<TCreation, TRead>){
    
    const {id}: any = useParams();
    const [entity, setEntity] = useState<TCreation>();
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${props.url}/${id}`)
            .then((response: AxiosResponse<genreCreationDTO>) => {
                //@ts-ignore
                setEntity(props.transform(response.data));
            })
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id,axios,navigate,props]);


        
    async function edit(entityToEdit: TCreation){
        try{
            
            if(props.transformFormData){
                const formData = props.transformFormData(entityToEdit);
                await axios({
                    method: "put",
                    url: `${props.url}/${id}`,
                    data: formData,
                    headers: {"Content-Type": "multipart/form-data"}
                });

            } else {
                await axios.put(`${props.url}/${id}`, entityToEdit);
            }
            navigate(props.indexURL);
        }
        catch(error){
            //@ts-ignore
            if(error && error.response){
                //@ts-ignore
                setErrors(error.response.data);
            }
        }
    }
    
    return(

        <>
        
        {/* @ts-ignore */}
        <h3>Edit {props.entityName}</h3>

            <DisplayErrors errors={errors} />
            {/* @ts-ignore */}
            {entity ? props.children(entity, edit): <Loading />
            }
        
        </>

    )
}

interface editEntityProps<TCreation, TRead> {
    url: string;
    indexURL: string;
    entityName: string;
    transform(entity: TRead): TCreation;
    transformFormData?(model: TCreation): FormData;
    children(entity: TCreation, edit: (entity: TCreation) => void): ReactElement;
}

EditEntity.defaultProps = {
    //this is just to introduce a simple implementation
    //of transform because most times
    //it's just going to be changing a simple
    //transformation of one type to the other without changing
    //any specific values of any property
    transform: (entity: any) => {
        
        console.log("llega");
        return entity;
    }
}