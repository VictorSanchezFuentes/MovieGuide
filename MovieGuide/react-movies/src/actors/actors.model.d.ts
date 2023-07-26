import { movieTheaterDTO } from "../movietheaters/movieTheater.model";

interface actorCreationDTO {
    name: string;
    dateOfBirth?: Date;
    picture?: File;
    pictureURL?: string;
    biography?= string;
}


export interface actorMovieDTO {
    id: number;
    name: string;
    character: string;
    picture: string;
}

export interface actorDTO {
    id: number;
    name: string;
    biography: string;
    dateOfBirth: Date;
    picture: string;
}

export interface moviePutGetDTO {
    movie: movieDTO;
    selectedGenres: genreDTO[];
    nonSelectedGenres: genreDTO[];
    selectedMovieTheaters: movieTheaterDTO[];
    nonSelectedMovieTheaters: movieTheaterDTO[];
    actors: actorMovieDTO[];
}