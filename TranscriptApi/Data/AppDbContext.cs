using Microsoft.EntityFrameworkCore;
using TranscriptApi.Models;

namespace TranscriptApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
	public DbSet<AudioTranscript> AudioTranscripts { get; set; }
	public DbSet<AudioTranscriptLog> AudioTranscriptLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Username = "admin",
                    Password = "123456", // gerçek uygulamalarda hash kullan!
                    Role = "Admin"
                },
		new User 
		{
		    Id = 2,
		    Username = "editor",
	            Password = "editor123", // please use has on real apps
		    Role = "Editor"
		}
            );
        }
    }
}

