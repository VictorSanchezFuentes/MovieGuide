import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { moviePutGetDTO } from "../actors/actors.model";
import { urlMovies } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import { convertMovieToFormData } from "../utils/FormsDataUtils";
import Loading from "../utils/Loading";
import MovieForm from "./MovieForm";
import { movieCreationDTO } from "./movies.model";

export default function EditMovie(){
    const {id}: any = useParams();
    const [movie, setMovie] = useState<movieCreationDTO>();
    const [moviePutGet, setMoviePutGet] = useState<moviePutGetDTO>();
    const navigate = useNavigate();
    const [errors,setErrors] = useState<string[]>([]);


    useEffect(() => {
        axios.get(`${urlMovies}/PutGet/${id}`)
            .then((response: AxiosResponse<moviePutGetDTO>) => {
                const model: movieCreationDTO  = {
                    title: response.data.movie.title,
                    inTheaters: response.data.movie.inTheaters,
                    trailer: response.data.movie.trailer,
                    posterURL: response.data.movie.poster,
                    summary: response.data.movie.summary,
                    releaseDate: new Date(response.data.movie.releaseDate)
                };

                setMovie(model);
                setMoviePutGet(response.data);
            })

    }, [id])

    async function edit(movieToEdit: movieCreationDTO){
        try{
            const formData = convertMovieToFormData(movieToEdit);
            await axios({
                method: "put",
                url: `${urlMovies}/${id}`,
                data: formData,
                headers: {"Content-Type": "multipart/form-data"}
            });
            navigate(`/movie/${id}`);
        }
        catch(error){
            //@ts-ignore
            if(errors && errors.response){
                //@ts-ignore
                setErrors(error.response.data);
            }
        }
    }





    return(
        <>
            <h3>Edit Movie</h3>
            <DisplayErrors errors= {errors} />
            {movie && moviePutGet ? <MovieForm model={movie}
            onSubmit={async values => await edit(values)}
            nonSelectedGenres={moviePutGet.nonSelectedGenres}
            selectedGenres={moviePutGet.selectedGenres}

            nonSelectedMovieTheaters={moviePutGet.nonSelectedMovieTheaters}
            selectedMovieTheaters={moviePutGet.selectedMovieTheaters}
            selectedActors={moviePutGet.actors}
            /> : <Loading />}
            
        
        </>
    )
}