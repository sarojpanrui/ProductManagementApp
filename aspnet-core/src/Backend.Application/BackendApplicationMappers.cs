using Backend.DTOs.Bill;
using Backend.DTOs.Order;
using Backend.DTOs.Product;
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
    [Mapper]
    public partial class BilltoBillDtoMapper : MapperBase<Bill, BillDto>
    {
        public override partial BillDto Map(Bill source);

        public override partial void Map(Bill source, BillDto destination);
    }
    [Mapper]
    public partial class CreateBillDtoToBillMapper : MapperBase<CreateBillDto,Bill>
    {
        public override partial Bill Map(CreateBillDto source);

        public override partial void Map(CreateBillDto source, Bill destination);
    }
    [Mapper]
    public partial class OrderToOrderDtoMapper : MapperBase<Order, OrderDto>
    {
        public override partial OrderDto Map(Order source);

        public override partial void Map(Order source, OrderDto destination);
    }

    [Mapper]
    public partial class CreateOrderToOrderMapper : MapperBase<CreateOrderDto, Order>
    {
        public override partial Order Map(CreateOrderDto source);
        public override partial void Map(CreateOrderDto source, Order destination);
    }


}