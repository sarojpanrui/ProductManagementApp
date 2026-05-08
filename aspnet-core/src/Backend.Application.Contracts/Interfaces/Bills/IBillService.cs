using Backend.DTOs.Bill;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;



namespace Backend.Interfaces.Bills
{
    public interface IBillService
    {
        Task<BillDto> GetAsync(Guid id);

        //Task<List<BillDto>> GetListAsync();
        Task<PagedResultDto<BillDto>> GetListAsync(GetBillsListDto input);

        Task<BillDto> CreateAsync(CreateBillDto bill);

        Task<BillDto> UpdateAsync(Guid id, CreateBillDto bill);

        Task DeleteAsync(Guid id);
    }
}
