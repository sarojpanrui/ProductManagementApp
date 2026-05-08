using System;
using System.Collections.Generic;
using System.Text;

namespace Backend.DTOs.Customer
{
   public class CustomerAmountProductDto
    {
        public decimal? TotalAmount { get; set; } 
        public string? Products { get; set; }
    }
}
