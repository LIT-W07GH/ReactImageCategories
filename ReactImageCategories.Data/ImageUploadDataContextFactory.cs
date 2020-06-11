using System.IO;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace ReactImageCategories.Data
{
    public class ImageUploadDataContextFactory : IDesignTimeDbContextFactory<ImagesDataContext>
    {
        public ImagesDataContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}ReactImageCategories.Web"))
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new ImagesDataContext(config.GetConnectionString("ConStr"));
        }
    }
}