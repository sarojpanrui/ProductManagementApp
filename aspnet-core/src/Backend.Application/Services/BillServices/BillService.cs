using Backend.DTOs.Bill;
using Backend.DTOs.Product;
using Backend.Entity;
using Backend.Interfaces.Bills;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
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

        //public async Task<List<BillDto>> GetListAsync()
        //{
        //    var bills = await _billRepository.GetListAsync();

        //    return bills
        //    .Select(b => ObjectMapper.Map<Bill, BillDto>(b))
        //    .ToList();

        //}

        public async Task<PagedResultDto<BillDto>> GetListAsync(GetBillsListDto input)
        {
            var queryable = await _billRepository.GetQueryableAsync();

            queryable = queryable
                .OrderByDescending(x => x.CreationTime); 

            var totalCount = await AsyncExecuter.CountAsync(queryable);

            var items = await AsyncExecuter.ToListAsync(
                queryable
                    .Skip(input.SkipCount)
                    .Take(input.MaxResultCount)
            );

            return new PagedResultDto<BillDto>(
                totalCount,
                ObjectMapper.Map<List<Bill>, List<BillDto>>(items)
            );
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