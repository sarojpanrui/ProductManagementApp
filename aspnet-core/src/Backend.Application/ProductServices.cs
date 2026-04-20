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
    public class ProductServices : ApplicationService, IProductService
    {
        private readonly IRepository<Product, Guid> _productRepository;

        public ProductServices(IRepository<Product, Guid> productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<ProductDto> CreateProductAsync(CreateProductDto input)
        {
            var product = new Product
            {
                name = input.Name,
                description = input.Description,
                price =(int) input.Price,
                quantity = input.Quantity
            };

            await _productRepository.InsertAsync(product);

            return ObjectMapper.Map<Product, ProductDto>(product);
        }

        public async Task<List<ProductDto>> GetProductsAsync()
        {
            var products = await _productRepository.GetListAsync();

            return products.Select(p => new ProductDto
            {
                Id = p.Id.ToString(),
                name = p.name,
                description = p.description,
                price = p.price,
                quantity = p.quantity,
                CreateTime = p.CreationTime   
            }).ToList();
        }

        public async Task<ProductDto> GetProductByIdAsync(Guid id)
        {
            var product = await _productRepository.GetAsync(id);

            return ObjectMapper.Map<Product, ProductDto>(product);
        }

        public async Task<ProductDto> UpdateProductAsync(Guid id, CreateProductDto input)
        {
            var product = await _productRepository.GetAsync(id);

            product.name = input.Name;
            product.description = input.Description;
            product.price =(int) input.Price;
            product.quantity = input.Quantity;

            await _productRepository.UpdateAsync(product);

            return ObjectMapper.Map<Product, ProductDto>(product);
        }

        public async Task DeleteProductAsync(Guid id)
        {
            await _productRepository.DeleteAsync(id);
        }
    }
}