using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace ReactImageCategories.Data
{
    public class CategoriesRepository
    {
        private readonly string _connectionString;

        public CategoriesRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddCategory(Category category)
        {
            using (var context = new ImagesDataContext(_connectionString))
            {
                context.Categories.Add(category);
                context.SaveChanges();
            }
        }

        public void AddSubcategory(Subcategory subcategory)
        {
            using (var context = new ImagesDataContext(_connectionString))
            {
                context.Subcategories.Add(subcategory);
                context.SaveChanges();
            }
        }

        public List<Category> GetCategories(bool includeSubcategories)
        {
            using (var context = new ImagesDataContext(_connectionString))
            {
                IQueryable<Category> query = context.Categories;
                if (includeSubcategories)
                {
                    query = query.Include(c => c.Subcategories);
                }

                return query.ToList();
            }
        }
    }
}