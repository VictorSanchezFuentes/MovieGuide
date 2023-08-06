import { useEffect, useState } from "react";
import MoviesList from "./MoviesList";
import { landingPageDTO } from "./movies.model";
import { urlMovies } from "../endpoints";
import axios, {AxiosResponse} from "axios";
import AlertContext from "../utils/AlertContext";
import Authorized from "../auth/Authorized";

export default function LandingPage(){

    const[movies,setMovies] = useState<landingPageDTO>({});

  useEffect(() => {
    loadData();
    
  }, []);//setTimeout needs to be used with useEffect

  function loadData(){
    //@ts-ignore
    axios.get(urlMovies).then((response: AxioResponse<landingPageDTO>) => {
        //@ts-ignore
        setMovies(response.data);
        }
    )};
    
    return(
        <AlertContext.Provider value={() => {
            loadData();
        }}>

            <h3>In theaters</h3>
                <MoviesList movies={movies.inTheaters} />

            <h3>Upcoming Releases</h3>
                <MoviesList movies={movies.upcomingReleases} />
           
            <h3>Old Already Released</h3>
            <MoviesList movies={movies.alreadyReleased} />

        </AlertContext.Provider>
    )
}