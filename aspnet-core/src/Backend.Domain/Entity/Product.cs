using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Backend.Entity
{
    public class Product : AuditedAggregateRoot<Guid>
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }


    }
}
