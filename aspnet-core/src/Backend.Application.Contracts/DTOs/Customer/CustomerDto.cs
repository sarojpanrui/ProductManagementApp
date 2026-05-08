using System;
using System.Collections.Generic;
using System.Text;

namespace Backend.DTOs.Customer
{
    public class CustomerDto
    {
        public string? Id { get; set; }
        public string? Name { get; set; }

        public string? Address { get; set; }

        public decimal? TotalAmount { get; set; }

        public string? Phone { get; set; }

        public string? Email { get; set; }

        public string? Products { get; set; }
    }
}
