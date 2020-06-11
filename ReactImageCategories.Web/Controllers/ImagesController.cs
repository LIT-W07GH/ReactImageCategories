using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactImageCategories.Data;
using ReactImageCategories.Web.Models;

namespace ReactImageCategories.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private string _connectionString;

        public ImagesController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("upload")]
        public void Upload(UploadViewModel viewModel)
        {
            int firstComma = viewModel.Base64File.IndexOf(',');
            string base64 = viewModel.Base64File.Substring(firstComma + 1);
            byte[] fileContents = Convert.FromBase64String(base64);

            var guid = Guid.NewGuid();
            var ext = Path.GetExtension(viewModel.FileName);
            var fileName = $"{guid}{ext}";
            System.IO.File.WriteAllBytes($"uploads/{fileName}", fileContents);

            var uploadedImage = new UploadedImage
            {
                Description = viewModel.Description,
                FileName = fileName,
                SubcategoryId = viewModel.SubcategoryId
            };
            var repo = new ImagesRepository(_connectionString);
            repo.AddImage(uploadedImage);
        }

        [HttpGet]
        [Route("getbysubcategory")]
        public List<UploadedImage> GetBySubcategory(int subcategoryId)
        {
            var repo = new ImagesRepository(_connectionString);
            return repo.GetBySubcategory(subcategoryId);
        }

        [HttpGet]
        [Route("getbycategory")]
        public List<UploadedImage> GetByCategory(int categoryId)
        {
            var repo = new ImagesRepository(_connectionString);
            return repo.GetByCategory(categoryId);
        }



    }
}