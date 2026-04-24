using System;

namespace Backend.DTOs.Order
{
    public class CreateOrderDto
    {
        public string VendorName { get; set; }

        public decimal TotalAmount { get; set; }

        public string BuyProducts { get; set; } = string.Empty;

        public DateOnly OrderDate { get; set; } = new DateOnly();

        public DateOnly DeliveryDate { get; set; } = new DateOnly();

        public bool IsReceived { get; set; } = false;
    }
}
