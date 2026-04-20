using Backend.DTOs;
using Backend.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Backend
{
    public class BillService : ApplicationService, IBillService
    {
        private readonly IRepository<Bill, Guid> _billRepository;

        public BillService(IRepository<Bill, Guid> billRepository)
        {
            _billRepository = billRepository;
        }

        public async Task<BillDto> GetAsync(Guid id)
        {
            var bill = await _billRepository.GetAsync(id);

            return new BillDto
            {
                Id = bill.Id.ToString(),
                Customer = bill.Customer,
                TotalAmount = bill.TotalAmount,
                BuyProducts = bill.BuyProducts
            };
        }

        public async Task<List<BillDto>> GetListAsync()
        {
            var bills = await _billRepository.GetListAsync();

            return bills.Select(b => new BillDto
            {
                Id = b.Id.ToString(),
                Customer = b.Customer,
                TotalAmount = b.TotalAmount,
                BuyProducts = b.BuyProducts,
                CreateTime = b.CreationTime
            }).ToList();
        }

        public async Task<BillDto> CreateAsync(CreateBillDto input)
        {
            var bill = new Bill
            {
                Customer = input.Customer,
                TotalAmount = input.TotalAmount, 
                BuyProducts = input.BuyProducts
            };

            await _billRepository.InsertAsync(bill, autoSave: true);

            return new BillDto
            {
                Id = bill.Id.ToString(),
                Customer = bill.Customer,
                TotalAmount = bill.TotalAmount,
                BuyProducts = bill.BuyProducts
            };
        }

        public async Task<BillDto> UpdateAsync(Guid id, CreateBillDto input)
        {
            var bill = await _billRepository.GetAsync(id);

            bill.Customer = input.Customer;
            bill.TotalAmount = input.TotalAmount;
            bill.BuyProducts = input.BuyProducts;

            await _billRepository.UpdateAsync(bill, autoSave: true);

            return new BillDto
            {
                Id = bill.Id.ToString(),
                Customer = bill.Customer,
                TotalAmount = bill.TotalAmount,
                BuyProducts = bill.BuyProducts
            };
        }

        public async Task DeleteAsync(Guid id)
        {
            await _billRepository.DeleteAsync(id);
        }
    }
}