using Backend.DTOs.Order;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace Backend.Interfaces.Orders
{
    public interface IOrderService
    {
        Task<OrderDto> GetAsync(Guid id);

        //Task<List<OrderDto>> GetListAsync();
        Task<PagedResultDto<OrderDto>> GetListAsync(GetOrderListDto input);
        Task<OrderDto> CreateAsync(CreateOrderDto bill);
        Task<OrderDto> UpdateAsync(Guid id, CreateOrderDto bill);

        Task<string> DeleteAsync(Guid id);

        Task<string> Received(Guid id);
    }
}
