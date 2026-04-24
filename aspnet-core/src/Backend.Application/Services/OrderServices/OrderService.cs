using Backend.DTOs.Order;
using Backend.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Backend.Services.OrderServices
{
    public class OrderService : ApplicationService, IOrderService
    {
        private readonly IRepository<Order, Guid> _orderService;

        public OrderService(IRepository<Order, Guid> orderService)
        {
            this._orderService = orderService;
        }

        public async Task<OrderDto> CreateAsync(CreateOrderDto ord)
        {
            var order = ObjectMapper.Map<CreateOrderDto, Order>(ord);

            await _orderService.InsertAsync(order, autoSave: true);

            return ObjectMapper.Map<Order, OrderDto>(order);
        }

        public async Task<string> DeleteAsync(Guid id)
        {
            await _orderService.DeleteAsync(id);
            return "Successfully Deleted";
        }

        public async Task<OrderDto> GetAsync(Guid id)
        {

            var order = await _orderService.GetAsync(id);
            return ObjectMapper.Map<Order, OrderDto>(order);

        }

        public async Task<List<OrderDto>> GetListAsync()
        {
            var orders = await _orderService.GetListAsync();
            return orders.Select(p => ObjectMapper.Map<Order, OrderDto>(p)).ToList();          
        }

        public async Task<string> Received(Guid id)
        {
            var order = await _orderService.GetAsync(id);

            order.IsReceived = true;

            await _orderService.UpdateAsync(order);

            return "Successfully received";
        }

        public async Task<OrderDto> UpdateAsync(Guid id, CreateOrderDto ord)
        {
            var order = await _orderService.GetAsync(id);

            
            ObjectMapper.Map(ord, order);

            await _orderService.UpdateAsync(order);

            return ObjectMapper.Map<Order, OrderDto>(order);
        }
    }
}
