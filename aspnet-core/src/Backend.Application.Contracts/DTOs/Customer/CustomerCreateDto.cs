using System;
using System.Collections.Generic;
using System.Text;

namespace Backend.DTOs.Customer
{
    public class CustomerCreateDto
    {
        public string? Name { get; set; }

        public string? Address { get; set; }

        public string? Phone { get; set; }

        public string? Email { get; set; }

    }
}
