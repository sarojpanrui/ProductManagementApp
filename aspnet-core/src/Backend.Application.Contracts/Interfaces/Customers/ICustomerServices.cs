using Backend.DTOs.Customer;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace Backend.Interfaces.Customers
{
    public interface ICustomerServices
    {
        Task<CustomerDto> CreateAsync(CustomerCreateDto input);

        Task<CustomerDto> GetAsync(Guid id);

        Task<PagedResultDto<CustomerDto>> GetListAsync(
    GetCustomerListDto input);

        Task<CustomerDto> UpdateAsync(Guid id, CustomerCreateDto input);

        Task<string?> DeleteAsync(Guid id);

        Task<string?> UpdateAmountProduct(Guid id, CustomerAmountProductDto input);
    }
}
