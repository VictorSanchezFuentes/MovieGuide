﻿namespace MoviesApi.DTO
{
    public class MoviePostGetDTO
    {
        public List<GenreDTO> Genres { get; set; }
        public List<MovieTheaterDTO> MovieTheaters { get; set; }
    }
}
