namespace MoviesApi.DTO
{
    public class FIlterMoviesDTO
    {
        public int Page { get; set; }
        public int RecordsPerPage { get; set; }
        public PaginationDTO PaginationDTO { get; set; }{
            get {return new PaginationDTO() { } }
        }
    }
}
