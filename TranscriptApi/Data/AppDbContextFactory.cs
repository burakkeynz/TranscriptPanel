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
            optionsBuilder.UseSqlServer("Server=localhost,1433;Database=DummyDb;User Id=dummyid;Password=dummypassword;TrustServerCertificate=True;");
            //bu kısımları github pushlayabilmek adına dummy şekilde bıraktım, kendi bilgisayarımda local olarak docker üzerinden mssql'i kaldırıyordum, readme kısmında kendiniz test edebilmeniz için kendi bilgisayarınızda kurulum bilgisi bıraktım 
            return new AppDbContext(optionsBuilder.Options);
        }
    }
}

