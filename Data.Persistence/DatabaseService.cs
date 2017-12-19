using Data.Core.Domain;
using Microsoft.EntityFrameworkCore;

namespace Data.Persistence {
    public class DatabaseService :DbContext {
        public DatabaseService(DbContextOptions<DatabaseService> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasIndex(u => new { u.Email })
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasOne(p => p.Post)
                .WithOne(u => u.User)
                .HasForeignKey<Post>(f => f.UserId);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<State> States { get; set; }
        
    }
}