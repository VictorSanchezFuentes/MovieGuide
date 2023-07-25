using System.ComponentModel.DataAnnotations;

namespace MoviesApi.DTO
{
    public class ActorCreationDTO
    {
        [Required]
        [StringLength(120)]
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Biography { get; set; }
        public /*string*/ IFormFile Picture { get; set; }
        //We'd deal with the picture later because it's
        //supposed to be a file
    }
}
