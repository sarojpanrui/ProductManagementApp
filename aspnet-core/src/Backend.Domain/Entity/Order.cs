using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Backend.Entity
{
    public class Order : AuditedAggregateRoot<Guid>
    {
        public string VendorName { get; set; }

        public decimal TotalAmount { get; set; }

        public string BuyProducts { get; set; } = string.Empty;

        public DateOnly OrderDate { get; set; } = new DateOnly();

        public DateOnly DeliveryDate { get; set; } = new DateOnly();

        public bool IsReceived { get; set; } = false;
    }
}
