﻿using System;
using System.Collections.Generic;

namespace ReactImageCategories.Data
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Subcategory> Subcategories { get; set; }
    }
}
