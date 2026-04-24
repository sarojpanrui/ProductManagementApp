using Backend.DTOs.Order;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend
{
    public interface IOrderService
    {
        Task<OrderDto> GetAsync(Guid id);

        Task<List<OrderDto>> GetListAsync();

        Task<OrderDto> CreateAsync(CreateOrderDto bill);
        Task<OrderDto> UpdateAsync(Guid id, CreateOrderDto bill);

        Task<string> DeleteAsync(Guid id);

        Task<string> Received(Guid id);
    }
}
