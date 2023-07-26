import MovieForm from "./MovieForm";
import { movieCreationDTO, moviesPostGetDTO } from "./movies.model";
import { genreDTO } from "../genres/genres.model";
import { movieTheaterDTO } from "../movietheaters/movieTheater.model";
import { useEffect, useState } from "react";
import axios from "axios";
import { urlMovies } from "../endpoints";
import Loading from "../utils/Loading";
import { convertMovieToFormData } from "../utils/FormsDataUtils";
import { useNavigate } from "react-router-dom";
import DisplayErrors from "../utils/DisplayErrors";

export default function CreateMovie(){

    const [nonSelectedGenres, setNonSetlectedGenres] = useState<genreDTO[]>([]);
    const [nonSelectedMovieTheaters, setNonSelectedMovieTheaters] = 
        useState<movieTheaterDTO[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();




    useEffect(() => {
        axios.get(`${urlMovies}/postget`)
            //@ts-ignore
            .then((response: AxiosResponse<moviesPostGetDTO>) => {
                    setNonSetlectedGenres(response.data.genres);
                    setNonSelectedMovieTheaters(response.data.movieTheaters);
                    setLoading(false);
            })

    }, []);

    async function create(movie: movieCreationDTO){
        try{
            const formData = convertMovieToFormData(movie);
            //@ts-ignore
            for (var pair of formData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }
            await axios
            ({
                method: "post",
                url: urlMovies,
                data: formData,
                headers: {"Content-Type": "multipart/form-data"}
            }).then(response =>{ 
                console.log(response.data);
                navigate(`/movies/${response.data}`);
            })

        } catch (error){
            //@ts-ignore
            if(error  && error.response){
                //@ts-ignore
                setErrors(Array.from(error.response.data));
            }
        }
    }
    
    
    return(
        <>
            <h3>Create Movie</h3>
            <DisplayErrors errors={errors} />
            {loading ? <Loading /> :
                <MovieForm model={{ title: "", inTheaters: false, trailer: "" }}
                onSubmit={async values => await create(values)}

                nonSelectedGenres={nonSelectedGenres}
                selectedGenres={[]}

                selectedMovieTheaters={[]}
                nonSelectedMovieTheaters={nonSelectedMovieTheaters}
                selectedActors={[]}
            />
            }
        
        </>
    )
}
