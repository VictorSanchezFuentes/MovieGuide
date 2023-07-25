import { useEffect, useState, ReactElement } from "react";
import { Link } from "react-router-dom";
import RecordsPerPageSelect from "./RecordsPerPageSelect";
import GenericList from "./GenericList";
import Button from "./Button";
import Pagination from "./Pagination";
import { AxiosResponse } from "axios";
import CustomConfirm from "./CustomConfirm";

export default function IndexEntity<T>(props: indexEntityProps<T>){
    
    const axios = require('axios');
    const [entities, setEntities] = useState<T[]>();
    const [totalAmountOfPages,setTotalAmountOfPages] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [page, setPage] = useState(1);




    useEffect(() =>  {
        loadData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page,recordsPerPage]);

    function loadData(){
        axios.get(props.url, {
            params: {page, recordsPerPage}
        })
        .then((response: AxiosResponse<T[]>) =>{
            const totalAmountOfRecords = 
                parseInt(response.headers["totalamountofrecords"], 10);
            setTotalAmountOfPages(Math.ceil(totalAmountOfRecords / recordsPerPage));
            //@ts-ignore
            setEntities(response.data);
        })
    }

    async function deleteEntity(id: number){
        try{
            await axios.delete(`${props.url}/${id}`);
            loadData();
        }
        catch(error){
            // @ts-ignore
            if(error as Error & error.response)
            {
                // @ts-ignore
                setErrors(error.response.data);
            }
        }
    }

    const buttons = (editUrl: string, id: number) => 
    <>
        <Link className="btn btn-success"  to={editUrl}>Edit</Link>
        <Button onClick={() => CustomConfirm(() => deleteEntity(id))} className="btn btn-danger">Delete</Button>
    </>
    
    
    return(
        <>
            <h3>{props.title}</h3>
            <Link className="btn btn-primary" to={props.createURL}
            > Create {props.entityName}</Link>

            <RecordsPerPageSelect onChange={amountOfRecords => {
                setPage(1);
                setRecordsPerPage(amountOfRecords);
            }}
            />

            <Pagination currentPage={page} totalAmountOfPages={totalAmountOfPages}
                onChange={newPage => setPage(newPage)}
            />

            
            <GenericList list={entities}>
                <table className="table table-striped">
                    {/* @ts-ignore */}
                    {props.children(entities!, buttons)}
                    {/* entities can be undefined but i put the ! because
                    i know it won't be */}
                </table>
            </GenericList>
        </>
    )
}

interface indexEntityProps<T>{
    url: string;
    title: string;
    createURL: string;
    entityName: string;
    children(entities: T[],
        buttons: (editUrl: string, id: number) => ReactElement): ReactElement;
}