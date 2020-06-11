using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactImageCategories.Data;

namespace ReactImageCategories.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private string _connectionString;

        public CategoriesController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("addcategory")]
        public void AddCategory(Category category)
        {
            var repo = new CategoriesRepository(_connectionString);
            repo.AddCategory(category);
        }

        [HttpPost]
        [Route("addsubcategory")]
        public void AddSubcategory(Subcategory subcategory)
        {
            var repo = new CategoriesRepository(_connectionString);
            repo.AddSubcategory(subcategory);
        }

        [HttpGet]
        [Route("getcategories")]
        public List<Category> GetCategories(bool includeSubcategories)
        {
            var repo = new CategoriesRepository(_connectionString);
            return repo.GetCategories(includeSubcategories);
        }
    }
}