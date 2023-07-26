using System.ComponentModel.DataAnnotations;

namespace MoviesApi.Entities
{
    public class MoviesActors
    {
        public int ActorId { get; set; }
        public int MovieId { get; set; }
        [StringLength(maximumLength: 75)]
        public string Character { get; set; }
        public int Order { get; set; }//the order in which the
                                      //actors shoudl appear in the movie details
                                      //screen which is hwere we're going to
                                      //displaythe details of a movie
        public Actor Actor { get; set; }
        public Movie Movie { get; set; }

    }
}
