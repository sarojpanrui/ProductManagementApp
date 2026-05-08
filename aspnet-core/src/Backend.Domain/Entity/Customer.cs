using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Domain.Entities.Auditing;

namespace Backend.Entity
{
    public class Customer : FullAuditedAggregateRoot<Guid>
    {
        public string? Name { get; set; }

        public string? Address { get; set; }

        public decimal? TotalAmount { get; set; }

        public string? Phone { get; set; }

        public string? Email { get; set; }

        public string? Products { get; set; }
    }
}
