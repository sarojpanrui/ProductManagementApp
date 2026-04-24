using Backend.DTOs.Product;
using Backend.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Backend.Services.ProductServices
{
    public class ProductServices : ApplicationService, IProductService
    {
        private readonly IRepository<Product, Guid> _productRepository;

        public ProductServices(IRepository<Product, Guid> productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<ProductDto> CreateProductAsync(CreateProductDto input)
        {
            var product = ObjectMapper.Map<CreateProductDto, Product>(input);

            await _productRepository.InsertAsync(product);

            return ObjectMapper.Map<Product, ProductDto>(product);
        }

        public async Task<List<ProductDto>> GetProductsAsync()
        {
            var products = await _productRepository.GetListAsync();

            return products
                .Select(p => ObjectMapper.Map<Product, ProductDto>(p))
                .ToList();

            
        }

        public async Task<ProductDto> GetProductByIdAsync(Guid id)
        {
            var product = await _productRepository.GetAsync(id);

            return ObjectMapper.Map<Product, ProductDto>(product);
        }

        public async Task<ProductDto> UpdateProductAsync(Guid id, CreateProductDto input)
        {
            var product = await _productRepository.GetAsync(id);

            ObjectMapper.Map(input, product);

            await _productRepository.UpdateAsync(product);

            return ObjectMapper.Map<Product, ProductDto>(product);
        }

        public async Task DeleteProductAsync(Guid id)
        {
            await _productRepository.DeleteAsync(id);
        }
    }
}