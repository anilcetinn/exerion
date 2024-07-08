



using Microsoft.EntityFrameworkCore;


namespace ExerionAPI.Models
{
    public class ExerionDbContext : DbContext
    {
        public ExerionDbContext(DbContextOptions<ExerionDbContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<ExerciseProgram> Programs { get; set; }


    }
}
