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

            modelBuilder.Entity<Post>()
                .HasOne(p => p.UploadedSong)
                .WithOne(u => u.Post)
                .HasForeignKey<Song>(f => f.PostId);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Song> Songs { get; set; }
        
        public DbSet<Order> Orders { get; set; }
        
    }
}