//the d means this is a type definition file and we're going to use it
//exxclusively for importing interfaces

import { actorMovieDTO } from "../actors/actors.model";
import { movieTheaterDTO } from "../movietheaters/movietheaters.model";
import { genreDTO } from "../genre/genre.model";



export interface movieDTO {
    id: number;
    title: string;
    poster: string; //img of the movie in url
}

export interface movieCreationDTO {
  title: string;
  inTheaters: boolean;
  trailer: string;
  releaseDate?: Date;
  porter?: File;
  posterURL?: string;
  genresIds?: number[];
  movieTheatersIds?: number[];
  actors?:actorMovieDTO[];
}

export interface landingPageDTO {
    inTheaters?: movieDTO[];
    upcomingReleases?: movieDTO[];
}


export interface moviesPostGetDTO {
  genres: genreDTO[];
  movieTheaters: movieTheaterDTO[];

}



//DTO data transfer object