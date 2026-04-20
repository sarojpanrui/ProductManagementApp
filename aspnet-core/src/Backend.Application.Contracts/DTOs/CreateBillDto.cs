using System;
using System.Collections.Generic;
using System.Text;

namespace Backend.DTOs
{
    public class CreateBillDto
    {
        public string Customer { get; set; } = string.Empty;

        public decimal TotalAmount { get; set; }

        public string BuyProducts { get; set; } = string.Empty;
    }
}
