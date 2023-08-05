using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using MoviesApi.Entities;
using System.Diagnostics.CodeAnalysis;

namespace MoviesApi
{
    public class ApplicationDBContext: IdentityDbContext
    {
        public ApplicationDBContext([NotNullAttribute]DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MoviesActors>().HasKey(x => new {x.ActorId, x.MovieId});
            modelBuilder.Entity<MoviesGenres>().HasKey(x => new { x.GenreId, x.MovieId });
            modelBuilder.Entity<MovieTheatersMovies>().HasKey(x => new { x.MovieTheaterId, x.MovieId });
            
            
            
            
            base.OnModelCreating(modelBuilder);
        }//never delete this method because we'd need it when we build out
        //authentication system

        public DbSet<Genre> Genres { get; set; }
        public DbSet<Actor> Actors { get; set; }
        public DbSet<MovieTheater> MovieTheaters { get; set;}
        public DbSet<Movie> Movies { get; set; }
        public DbSet<MoviesActors> MoviesActors { get; set; }
        public DbSet<MovieTheatersMovies> MovieTheatersMovies { get; set; }
        public DbSet<MoviesGenres> MoviesGenres { get; set; }
        public DbSet<Rating> Ratings { get; set; }




    }

    //public class ApplicationDBContextFactory : IDesignTimeDbContextFactory<ApplicationDBContext>
    //{
    //    public ApplicationDBContext CreateDbContext(string[] args)
    //    {
    //        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDBContext>();
    //        optionsBuilder.UseSqlServer("Data Source=LAPTOP-T70EVGQC\\MSSQLSERVER01;Initial Catalog=MoviesAPI;Integrated Security=True;Encrypt=False");

    //        return new ApplicationDBContext(optionsBuilder.Options);
    //    }
    //}





}
