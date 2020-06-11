using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace ReactImageCategories.Data
{
    public class ImagesRepository
    {
        private readonly string _connectionString;

        public ImagesRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddImage(UploadedImage image)
        {
            using (var context = new ImagesDataContext(_connectionString))
            {
                context.UploadedImages.Add(image);
                context.SaveChanges();
            }
        }

        public List<UploadedImage> GetBySubcategory(int subcategoryId)
        {
            using (var context = new ImagesDataContext(_connectionString))
            {
                return context.UploadedImages.Where(i => i.SubcategoryId == subcategoryId).ToList();
            }
        }

        public List<UploadedImage> GetByCategory(int categoryId)
        {
            using (var context = new ImagesDataContext(_connectionString))
            {
                return context.UploadedImages
                    .Include(u => u.Subcategory)
                    .Where(i => i.Subcategory.Category.Id == categoryId)
                    .ToList();
            }
        }

    }
}