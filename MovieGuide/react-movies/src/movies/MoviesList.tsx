import IndividualMovie from "./IndividualMovie";
import { movieDTO } from "./movies.model";
import css from "./MoviesList.module.css"
import Loading from "../utils/Loading";
import GenericList from "../utils/GenericList";

export default function MoviesList(props: moviesListProps){
    
    // if(!props.movies){
    //     // return <>Loading...</>
    //     return <Loading />
    // } else if (props.movies.length === 0) {
    //     return <>There are no movies to display</>
    // } else {
    //     return(
    //         <div className={css.div}>
    //                 {props.movies.map(movie =>
    //                     <IndividualMovie {...movie} key={movie.id} />)}
    //                     {/* //key allows us to differentiate each one and
    //                     id is a great candidate for that */}
    
    //         </div>
    //     )
    // }

    return(
        <GenericList
        //loadingUI={<>Loading...</>} in case
        //i don't want to show the loading
        //gif i can show a custom loadingUI
        list={props.movies}>
        <div className={css.div}>
            {props.movies?.map(movie =>
                <IndividualMovie {...movie} key={movie.id} />)}
                {/* //key allows us to differentiate each one and
                id is a great candidate for that */}

            </div>
        </GenericList>//?  because the code doesn't
        //run if movies is undefined this will
        //not be run
    )

    
}

interface moviesListProps{
    movies?: movieDTO[];
}

//we need to take into account 
//that, if upcomingReleases or inTheaters's
//props could be undefined,
//then movies could be undefined