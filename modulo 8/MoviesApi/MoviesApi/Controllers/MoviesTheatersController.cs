
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesApi.DTO;
using MoviesApi.Entities;
using MoviesApi.Helpers;

namespace MoviesApi.Controllers
{
    [ApiController]
    [Route("api/movietheaters")]
    public class MoviesTheatersController: ControllerBase
    {
        private readonly ApplicationDBContext context;
        private readonly IMapper mapper;

        public MoviesTheatersController(ApplicationDBContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }


        [HttpGet]
        public async Task<ActionResult<List<MovieTheaterDTO>>> Get([FromQuery]PaginationDTO paginationDTO)
        {
            var queryable = context.MovieTheaters.AsQueryable();
            await HttpContext.InsertParametersPaginationInHeader(queryable);
            var entities = await queryable.OrderBy(x => x.Name).Paginate(paginationDTO).ToListAsync();
            return mapper.Map<List<MovieTheaterDTO>>(entities);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<List<MovieTheaterDTO>>> Get(int id)
        {
            var movieTheater = await context.MovieTheaters.FirstOrDefaultAsync(x => x.Id == id);

            if(movieTheater == null)
            {
                return NotFound();
            }

            return mapper.Map<List<MovieTheaterDTO>>(movieTheater);
        }

        [HttpPost]
        public async Task<ActionResult> Post (int id, MovieTheaterCreationDTO movieTheaterCreationDTO)
        {
            var movieTheater = mapper.Map<MovieTheater>(movieTheaterCreationDTO);
            context.Add(movieTheater);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, MovieTheaterCreationDTO movieTheaterCreationDTO)
        {
            var movieTheater = await context.MovieTheaters.FirstOrDefaultAsync(x => x.Id == id);

            if (movieTheater == null)
            {
                return NotFound();
            }

            movieTheater = mapper.Map(movieTheaterCreationDTO, movieTheater);
            await context.SaveChangesAsync();
            return NoContent();

        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Detete(int id)
        {
            var movieTheater = await context.MovieTheaters.FirstOrDefaultAsync(x => x.Id == id);

            if (movieTheater == null)
            {
                return NotFound();
            }

            context.Remove(movieTheater);
            await context.SaveChangesAsync();
            return NoContent();

        }
    }
}
