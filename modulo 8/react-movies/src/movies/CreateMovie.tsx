import MovieForm from "./MovieForm";
import { moviesPostGetDTO } from "./movies.model";
import { genreDTO } from "../genres/genres.model";
import { movieTheaterDTO } from "../movietheaters/movieTheater.model";
import { useEffect, useState } from "react";
import axios from "axios";
import { urlMovies } from "../endpoints";
import Loading from "../utils/Loading";

export default function CreateMovie(){

    const [nonSelectedGenres, setNonSetlectedGenres] = useState<genreDTO[]>([]);
    const [nonSelectedMovieTheaters, setNonSelectedMovieTheaters] = 
        useState<movieTheaterDTO[]>([]);
    const [loading, setLoading] = useState(true);




    useEffect(() => {
        axios.get(`${urlMovies}/postget`)
            //@ts-ignore
            .then((response: AxiosResponse<moviesPostGetDTO>) => {
                    setNonSetlectedGenres(response.data.genres);
                    setNonSelectedMovieTheaters(response.data.movieTheaters);
                    setLoading(false);
            })

    }, []);
    
    
    return(
        <>
            <h3>Create Movie</h3>
            {loading ? <Loading /> :
                <MovieForm model={{ title: "", inTheaters: false, trailer: "" }}
                onSubmit={values => console.log(values)}

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

function AxiosResponse(reason: any): PromiseLike<never> {
    throw new Error("Function not implemented.");
}
