import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { actorMovieDTO } from "../actors/actors.model";
import CheckboxField from "../forms/CheckboxField";
import DateField from "../forms/DateField";
import ImageField from "../forms/ImageField";
import MarkdownField from "../forms/MarkDownField";
import MultipleSelector, { multipleSelectorModel } from "../forms/MultipleSelector";
import TextField from "../forms/TextField";
import TypeAheadActors from "../forms/TypeAheadActors";
import { genreDTO } from "../genres/genres.model";
import { movieTheaterDTO } from "../movietheaters/movieTheater.model";
import Button from "../utils/Button";
import { movieCreationDTO } from "./movies.model";

export default function MovieForm(props: movieFormProps){

    const [selectedGenres, setSelectedGenres] = useState(mapToModel(props.selectedGenres));
    const [nonSelectedGenres, setNonSelectedGenres] = useState(mapToModel(props.nonSelectedGenres));

    const [selectedMovieTheaters, setSelectedMovieTheaters] = useState(mapToModel(props.selectedMovieTheaters));
    const [nonSelectedMovieTheaters, setNonSelectedMovieTheaters] = useState(mapToModel(props.nonSelectedMovieTheaters));

    const [selectedActors, setSelectedActors] = useState((props.selectedActors));
    


    function mapToModel(items: {id:number, name:string}[]): multipleSelectorModel[] {
        return items.map(item => {
            return {key: item.id, value: item.name}
        })
    }

    return(
        <Formik
            initialValues={props.model}
            onSubmit={(values,actions) => {
                values.genresIds = selectedGenres.map(item => item.key);
                values.movieTheatersIds = selectedMovieTheaters.map(item => item.key);
                values.actors = selectedActors;


                //before we call the parent component we want to
                //edit the values we have there
                props.onSubmit(values, actions)
            }}
            validationSchema={Yup.object({
                title: Yup.string().required("this field is required").firstLetterUppercase()
            })}>
            {(formikProps) => (
                <Form>
                    <TextField displayName="title" field="title" />
                    <CheckboxField displayName="In Theaters" field="inTheaters" />
                    <TextField displayName="trailer" field="trailer" />
                    <DateField displayName="Realease Date" field="releaseDate" />
                    <ImageField displayName="Poster" field="poster"
                        imageURL={props.model.posterURL} />
                    <MarkdownField displayName="Summary" field="summary" />

                    <MultipleSelector
                        displayName="Genres"
                        nonSelected={nonSelectedGenres}
                        selected={selectedGenres}
                        onChange={(selected,nonSelected) =>{
                            setSelectedGenres(selected);
                            setNonSelectedGenres(nonSelected);
                        }}
                    />


                    <MultipleSelector
                        displayName="MovieTheaters"
                        nonSelected={nonSelectedMovieTheaters}
                        selected={selectedMovieTheaters}
                        onChange={(selected,nonSelected) =>{
                            setSelectedMovieTheaters(selected);
                            setNonSelectedMovieTheaters(nonSelected);
                        }}
                    />

                    <TypeAheadActors actors={selectedActors} displayName="Actors"
                        onAdd={ actors => {
                            setSelectedActors(actors);

                        }}
                        onRemove={actor =>  {
                            const actors =selectedActors.filter(
                                 x => x !== actor);
                                 setSelectedActors(actors);

                        }}
                        /* @ts-ignore */
                        listUI={(actor: actorMovieDTO) =>
                            <>
                            {actor.name} / <input placeholder="character" type="text"
                            value={actor.character}
                            onChange={e => {
                                const index = selectedActors.findIndex
                                (x =>x.id === actor.id);
                                    const actors=[...selectedActors];
                                    actors[index].character = e.currentTarget.value;
                                    setSelectedActors(actors);
                            }} />
                            </>
                        }
                    />

                    <Button disabled={formikProps.isSubmitting}
                    type="submit">Save Changes</Button>
                    <Link className="btn btn-secondary" to="/">Cancel</Link>
                    
                </Form>
            )}
        </Formik>
    )

}

interface movieFormProps{
    model: movieCreationDTO;
    onSubmit(values: movieCreationDTO, actions: FormikHelpers<movieCreationDTO>): void;
    selectedGenres: genreDTO[];
    nonSelectedGenres: genreDTO[];
    selectedMovieTheaters: movieTheaterDTO[];
    nonSelectedMovieTheaters:movieTheaterDTO[];
    selectedActors: actorMovieDTO[];
}