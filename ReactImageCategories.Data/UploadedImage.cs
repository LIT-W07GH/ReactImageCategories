using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace ReactImageCategories.Data
{
    public class UploadedImage
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string Description { get; set; }
        public int SubcategoryId { get; set; }

        [NotMapped]
        public string SubcategoryName => Subcategory.Name;

        [JsonIgnore]
        public Subcategory Subcategory { get; set; }
    }
}