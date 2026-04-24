using System;
using Volo.Abp.Application.Dtos;

namespace Backend.DTOs.Bill
{

    public class BillDto : EntityDto<Guid>
    {
        public string Id { get; set; }
        public string Customer { get; set; } = string.Empty;

        public decimal TotalAmount { get; set; }

        public string BuyProducts { get; set; } = string.Empty;
        public DateTime CreateTime { get; set; }
    }
}