import { useFormikContext } from "formik";

export default function DateField(props: dateFieldProps){
    const {values, validateForm, touched, errors} = useFormikContext<any>();

    //initial values are available through this
    //values we have here

    return(
        <div className="mb-3">
            <label htmlFor={props.field}>{props.displayName}</label>

            <input type="date" className="form-control" 
                id={props.field}
                name={props.field}
                //@ts-ignore
                defaultValue={values[props.field]?.toLocaleDateString("en-CA")}
                onChange={e => {
                    const date = new Date(e.currentTarget.value + "T00:00:00");
                    values[props.field] = date;
                    validateForm();
                }}
            />
            {touched[props.field] && errors[props.field] ? 
            <div className="text-danger">{errors[props.field]?.toString()}</div> : null}
        </div>
    )
}

interface dateFieldProps {
    field: string;
    displayName: string;
}