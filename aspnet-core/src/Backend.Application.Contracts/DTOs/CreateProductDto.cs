using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs
{
    public class CreateProductDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(500)]
        public string Description { get; set; } = string.Empty;

        [Range(1, 1000000)]
        public decimal Price { get; set; }

        [Range(0, 10000)]
        public int Quantity { get; set; }
    }
}