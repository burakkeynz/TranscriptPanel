using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using TranscriptApi.Models;

namespace TranscriptApi.Data
{
    public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
            optionsBuilder.UseSqlServer("Server=localhost,1433;Database=TranscriptDb;User Id=sa;Password=StrongP@ssw0rd123;TrustServerCertificate=True;");

            return new AppDbContext(optionsBuilder.Options);
        }
    }
}

