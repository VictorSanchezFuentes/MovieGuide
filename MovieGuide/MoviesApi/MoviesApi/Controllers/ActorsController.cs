﻿using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesApi.DTO;
using MoviesApi.Entities;
using MoviesApi.Helpers;
using System.Security.Permissions;

namespace MoviesApi.Controllers
{
    [Route("api/actors")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
    public class ActorsController : ControllerBase
    {
        private readonly ApplicationDBContext context;
        private readonly IMapper mapper;
        private readonly IFileStorageService fileStorageService;
        private readonly string containerName = "actors";

        public ActorsController(ApplicationDBContext context, IMapper mapper,
            IFileStorageService fileStorageService)
        {
            this.context = context;
            this.mapper = mapper;
            this.fileStorageService = fileStorageService;
        }


        [HttpGet]
        public async Task<ActionResult<List<ActorDTO>>> Get([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = context.Actors.AsQueryable();
            await HttpContext.InsertParametersPaginationInHeader(queryable);
            var actors = await queryable.OrderBy(x=>x.Name).Paginate(paginationDTO).ToListAsync();
            return mapper.Map<List<ActorDTO>>(actors);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ActorDTO>> Get(int id)
        {
            var actor = await context.Actors.FirstOrDefaultAsync(x => x.Id == id);
            if (actor == null)
            {
                return NotFound();
            }
            return mapper.Map<ActorDTO>(actor);
        }

        [HttpGet("searchByName/{query}")]
        public async Task<ActionResult<List<ActorsMovieDTO>>> SearchByName(string query)
        {
            if (string.IsNullOrWhiteSpace(query)) { return new List<ActorsMovieDTO>(); }

            return await context.Actors.Where(x => x.Name.Contains(query))
                .OrderBy(x => x.Name).Select(x => new ActorsMovieDTO { Id = x.Id, Name = x.Name, Picture = x.Picture })
                .Take(5).ToListAsync();
            //we use select instead of  automapper because it's quite simple
            //Take 5 just so that we only show some of them
        }


        [HttpPost]
        public async Task<ActionResult<List<ActorDTO>>> Post([FromForm]ActorCreationDTO actorCreationDTO)
        {
            
            var actor = mapper.Map<Actor>(actorCreationDTO);
            if(actorCreationDTO.Picture != null)
            {
                actor.Picture = await fileStorageService.SaveFile(containerName, actorCreationDTO.Picture);
            }
            context.Add(actor);
            await context.SaveChangesAsync();
            return NoContent();
        }


        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id,[FromForm]ActorCreationDTO actorCreationDTO)
        {
            var actor = await context.Actors.FirstOrDefaultAsync(x => x.Id == id);
            if (actor == null)
            {
                return NotFound();
            }
            actor = mapper.Map(actorCreationDTO, actor);

            if (actorCreationDTO.Picture != null)
            {
                actor.Picture = await fileStorageService.EditFile(containerName, actorCreationDTO.Picture, actor.Picture);
            }
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id, [FromForm]ActorCreationDTO actorCreationDTO)
        {
            var actor = await context.Actors.FirstOrDefaultAsync(x => x.Id == id);
            if (actor == null)
            {
                return NotFound();
            }
            context.Remove(actor);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
