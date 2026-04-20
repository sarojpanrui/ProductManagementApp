using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Domain.Entities.Auditing;

namespace Backend.Entity
{
    public class Product:AuditedAggregateRoot<Guid>
    {
        public string name { get; set; }
        public string description { get; set; }
        public int price { get; set; }
        public int quantity { get; set; }


    }
}
