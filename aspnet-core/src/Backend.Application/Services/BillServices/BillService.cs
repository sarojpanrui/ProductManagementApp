using Backend.DTOs.Bill;
using Backend.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Backend.Services.BillServices
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
            return ObjectMapper.Map<Bill, BillDto>(bill);
        }

        public async Task<List<BillDto>> GetListAsync()
        {
            var bills = await _billRepository.GetListAsync();

            return bills
            .Select(b => ObjectMapper.Map<Bill, BillDto>(b))
            .ToList();

        }

        public async Task<BillDto> CreateAsync(CreateBillDto input)
        {
            var bill = ObjectMapper.Map<CreateBillDto, Bill>(input);

            await _billRepository.InsertAsync(bill, autoSave: true);

            return ObjectMapper.Map<Bill, BillDto>(bill);
        }

        public async Task<BillDto> UpdateAsync(Guid id, CreateBillDto input)
        {
            var bill = await _billRepository.GetAsync(id);

            ObjectMapper.Map(input, bill);

            await _billRepository.UpdateAsync(bill, autoSave: true);

            return ObjectMapper.Map<Bill, BillDto>(bill);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _billRepository.DeleteAsync(id);
        }
    }
}