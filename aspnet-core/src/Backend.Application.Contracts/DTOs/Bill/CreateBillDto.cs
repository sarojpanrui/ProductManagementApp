namespace Backend.DTOs.Bill
{
    public class CreateBillDto
    {
        public string Customer { get; set; } = string.Empty;
        public string? CustomerId { get; set; } = string.Empty;

        public decimal TotalAmount { get; set; }

        public string BuyProducts { get; set; } = string.Empty;
    }
}
