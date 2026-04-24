using System;

namespace Backend.DTOs.Product
{
    public class ProductDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }

        public DateTime CreateTime { get; set; }
    }
}
