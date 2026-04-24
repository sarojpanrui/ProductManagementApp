using Backend.DTOs.Product;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace Backend
{
    public interface IProductService : IApplicationService
    {
        Task<ProductDto> CreateProductAsync(CreateProductDto input);

        Task<List<ProductDto>> GetProductsAsync();

        Task<ProductDto> GetProductByIdAsync(Guid id);

        Task<ProductDto> UpdateProductAsync(Guid id, CreateProductDto input);

        Task DeleteProductAsync(Guid id);
    }
}