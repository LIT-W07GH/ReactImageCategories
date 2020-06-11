using System.Collections.Generic;
using Newtonsoft.Json;

namespace ReactImageCategories.Data
{
    public class Subcategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        [JsonIgnore]
        public Category Category { get; set; }
        public List<UploadedImage> Images { get; set; }
    }
}