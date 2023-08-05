using System.ComponentModel.DataAnnotations;

namespace MoviesApi.DTO
{
    public class RatingDTO
    {
        [Range(0, 5)]
        public int Rating { get; set; }
        public int MovieId { get; set; }
    }
}
