import { Link } from "react-router-dom";
import Button from "../utils/Button";
import TextField from "../forms/TextField";
import * as Yup from "yup";
import { Form, Formik, FormikHelpers } from "formik";
import { genreCreationDTO } from "./genres.model";

export default function GenreForm(props: genreFormProps){
    return(
        <>

            <Formik initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                name: Yup.string().required("This field is required")
                .max(50, "Max length is 50 characters")
                
            })}
            >
                {(formikProps: { isSubmitting: boolean | undefined; }) => (
                    <Form>
                        <TextField displayName="Name" field="name" />

                        <Button disabled ={formikProps.isSubmitting} type="submit" >Save Changes</Button>
                        <Link className="btn btn-secondary" to="/genres">Cancel</Link>
                    </Form>
                )}
            </Formik>
        
        
        </>
    )
}


interface genreFormProps{
    model: genreCreationDTO;
    onSubmit(values: genreCreationDTO, action: FormikHelpers<genreCreationDTO>): void;
}