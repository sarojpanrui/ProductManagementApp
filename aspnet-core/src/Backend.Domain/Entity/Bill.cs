using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Backend.Entity
{
    public class Bill : AuditedAggregateRoot<Guid>
    {
        public string Customer { get; set; } = string.Empty;

        public decimal TotalAmount { get; set; }

        public string BuyProducts { get; set; } = string.Empty;
    }
}