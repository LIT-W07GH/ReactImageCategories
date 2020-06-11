using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactImageCategories.Web.Models
{
    public class UploadViewModel
    {
        public string Description { get; set; }
        public string Base64File { get; set; }
        public string FileName { get; set; }
        public int SubcategoryId { get; set; }
    }
}
