using Backend.DTOs.Bill;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;



namespace Backend
{
    public interface IBillService
    {
        Task<BillDto> GetAsync(Guid id);

        Task<List<BillDto>> GetListAsync();

        Task<BillDto> CreateAsync(CreateBillDto bill);

        Task<BillDto> UpdateAsync(Guid id, CreateBillDto bill);

        Task DeleteAsync(Guid id);
    }
}
