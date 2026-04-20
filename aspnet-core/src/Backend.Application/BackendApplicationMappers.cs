using Backend.DTOs;
using Backend.DTOs;
using Backend.Entity;
using Riok.Mapperly.Abstractions;
using Volo.Abp.Mapperly;

namespace Backend;

[Mapper]
public partial class BackendApplicationMappers
{
    [Mapper]
    public partial class ProductToProductDtoMapper : MapperBase<Product, ProductDto>
    {
        public override partial ProductDto Map(Product source);

        public override partial void Map(Product source, ProductDto destination);
    }

    [Mapper]
    public partial class CreateProductDtoToProductMapper : MapperBase<CreateProductDto, Product>
    {
        public override partial Product Map(CreateProductDto source);

        public override partial void Map(CreateProductDto source, Product destination);
    }
}