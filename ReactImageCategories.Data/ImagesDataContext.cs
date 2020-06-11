using Microsoft.EntityFrameworkCore;

namespace ReactImageCategories.Data
{
    public class ImagesDataContext : DbContext
    {
        private readonly string _connectionString;

        public ImagesDataContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Subcategory> Subcategories { get; set; }
        public DbSet<UploadedImage> UploadedImages { get; set; }
    }

   
}