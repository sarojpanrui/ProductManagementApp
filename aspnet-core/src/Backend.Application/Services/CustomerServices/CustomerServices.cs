using Backend.DTOs.Customer;
using Backend.Entity;
using Backend.Interfaces.Customers;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.ObjectMapping;
using System.Linq;



namespace Backend.Services.CustomerServices
{
    public class CustomerServices : ApplicationService, ICustomerServices
    {
        private readonly IRepository<Customer, Guid> _customerRepository;

        public CustomerServices(
            IRepository<Customer, Guid> customerRepository)
        {
            _customerRepository = customerRepository;
        }

        public async Task<CustomerDto> CreateAsync(CustomerCreateDto input)
        {
            var customer = ObjectMapper.Map<CustomerCreateDto, Customer>(input);

            await _customerRepository.InsertAsync(customer);

            return ObjectMapper.Map<Customer, CustomerDto>(customer);
        }

        public async Task<string> DeleteAsync(Guid id)
        {
           await _customerRepository.DeleteAsync(id);
            return "Successfully Deleted";
        }

        public async Task<CustomerDto> GetAsync(Guid id)
        {
            var customer = await _customerRepository.GetAsync(id);
            return ObjectMapper.Map<Customer,CustomerDto>(customer);
        }

        public async Task<PagedResultDto<CustomerDto>> GetListAsync(
    GetCustomerListDto input)
        {
            var queryable = await _customerRepository.GetQueryableAsync();

            var totalCount = await AsyncExecuter.CountAsync(queryable);

            var items = await AsyncExecuter.ToListAsync(
                queryable
                    .Skip(input.SkipCount)
                    .Take(input.MaxResultCount)
            );

            var customerDtos =
                ObjectMapper.Map<List<Customer>, List<CustomerDto>>(items);

            return new PagedResultDto<CustomerDto>(
                totalCount,
                customerDtos
            );
        }

        public async Task<string?> UpdateAmountProduct(Guid id, CustomerAmountProductDto input)
        {
            var customer = await _customerRepository.GetAsync(id);
            customer.TotalAmount = input.TotalAmount;
            customer.Products = input.Products;

            return "succesfully added amount and products...";
        }

        public async Task<CustomerDto> UpdateAsync(Guid id, CustomerCreateDto input)
        {
            var customer = _customerRepository.GetAsync(id).Result;
            ObjectMapper.Map(input, customer);
            await _customerRepository.UpdateAsync(customer);
            return ObjectMapper.Map<Customer, CustomerDto>(customer);
        }


    }
}
