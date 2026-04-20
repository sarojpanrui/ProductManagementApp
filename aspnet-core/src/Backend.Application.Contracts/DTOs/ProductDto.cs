using System;
using System.Collections.Generic;
using System.Text;

namespace Backend.DTOs
{
    public class ProductDto
    {
        public string Id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public int price { get; set; }
        public int quantity { get; set; }

        public DateTime CreateTime { get; set; }
    }
}
