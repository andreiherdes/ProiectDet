using Data.Core.Domain;
using Microsoft.EntityFrameworkCore;

namespace Data.Persistence
{
    public class DatabaseService : DbContext
    {
        public DatabaseService(DbContextOptions<DatabaseService> options) : base(options)
        {
            this.Database.EnsureCreated();
        }

        public DbSet<Data.Core.Domain.Musician> Musicians { get; set; }
    }
}