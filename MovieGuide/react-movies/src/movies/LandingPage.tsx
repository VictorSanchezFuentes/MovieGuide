import { useEffect, useState } from "react";
import MoviesList from "./MoviesList";
import { landingPageDTO } from "./movies.model";

export default function LandingPage(){

    const[movies,setMovies] = useState<landingPageDTO>({});

  useEffect(() => {
    const timerId = setTimeout(() => {
      setMovies({
        inTheaters: [{
                    id: 1,
                    title: "Spider-Man",
                    poster: "https://upload.wikimedia.org/wikipedia/en/b/b4/Spider-Man-_Across_the_Spider-Verse_poster.jpg"
            },
            {
                    id: 2,
                    title: "Luca",
                    poster: "https://upload.wikimedia.org/wikipedia/en/3/33/Luca_%282021_film%29.png"
            }
          ],
        upcomingReleases: [{
              id: 3,
              title: "Soul",
              poster: "https://upload.wikimedia.org/wikipedia/en/3/39/Soul_%282020_film%29_poster.jpg"
          }]
      })
    }, 500);

    return () => clearTimeout(timerId)
  });//setTimeout needs to be used with useEffect


    
    return(
        <>
            <h3>In theaters</h3>
                <MoviesList movies={movies.inTheaters} />

            <h3>Upcoming Releases</h3>
                <MoviesList movies={movies.upcomingReleases} />
        
        </>
    )
}