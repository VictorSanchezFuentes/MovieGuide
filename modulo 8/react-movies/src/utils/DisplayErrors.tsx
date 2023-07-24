export default function  DisplayErrors(props: displayErrorsProps){
    const style = {color: "red"};
    return(
        <>
        {/* @ts-ignore */}
        {props.errors ? <ul style={style}>
             {/* @ts-ignore */}
            {props.errors.map((error,index) => <li key={index}>{error}</li>)}
        </ul> : null
        }
        </>
    )
}

interface displayErrorsProps{
    errors?: string[];

}