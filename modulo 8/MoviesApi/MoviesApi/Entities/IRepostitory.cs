namespace MoviesApi.Entities
{
    public interface IRepostitory
    {
        Task <List<Genre>> GetAllGenres();
        Genre GetGenreById(int Id);
    }
}
