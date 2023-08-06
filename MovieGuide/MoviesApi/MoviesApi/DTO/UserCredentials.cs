using System.ComponentModel.DataAnnotations;

namespace MoviesApi.DTO
{
    public class UserCredentials
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set;}
        [Required]

        public string? Password { get; set;}
    }
}
