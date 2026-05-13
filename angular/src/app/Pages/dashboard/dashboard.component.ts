import { Component } from '@angular/core';
import { ProductServicesService } from '@proxy/services/product-services';
import { inject } from '@angular/core';
import { BillDto } from '@proxy/dtos/bill';
import { ProductDto } from '@proxy/dtos/product';
import { BillService } from '@proxy/services/bill-services/bill.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrderDto } from '@proxy/dtos/order';
import { OrderService } from '@proxy/services/order-services';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { CustomerServicesService } from '@proxy/services/customer-services';
import { CustomerDto } from '@proxy/dtos/customer';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, RouterModule, DragDropModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',

})
export class DashboardComponent {
  productService = inject(ProductServicesService);

  customerServices = inject(CustomerServicesService)
  billService = inject(BillService);
  orderService = inject(OrderService)

  products: ProductDto[] = [];
  bills: BillDto[] = [];
  order: OrderDto[] = [];

  recentBills: BillDto[] = [];
  recentProducts: ProductDto[] = [];

  product_count: number = 0;
  bill_count: number = 0;
  total_bill_amount: number = 0;
  customer_count: number = 0;
  vendor_count: number = 0;
  customers: CustomerDto[] = []

  isLoading: boolean = false;

  ngOnInit() {
    this.fetchProducts();
    this.fetchBills();
    this.fetchCustomer();
    this.fetchOrder()
  }

  fetchProducts() {
    this.isLoading = true;
    const input = {
      skipCount: 0,
      maxResultCount: 100
    };
    this.productService.getProducts(input).subscribe(res => {
      this.products = res.items ?? [];
      this.product_count = res.totalCount ?? 0;

      this.recentProducts = this.products
        .sort(
          (a, b) =>
            new Date(b.creationTime!).getTime() -
            new Date(a.creationTime!).getTime()
        )
        .slice(0, 5);
      this.isLoading = false;
    });
  }



  fetchBills() {
    this.isLoading = true;
    this.billService.getList({
      skipCount: 0,
      maxResultCount: 100,
    }).subscribe(res => {
      this.bill_count = res.totalCount ?? 0
      this.recentBills = [...res.items ?? []]
        .sort((a, b) =>
          new Date(b.creationTime ?? '').getTime() -
          new Date(a.creationTime ?? '').getTime()
        )
        .slice(0, 5);

      this.isLoading = false;
    });
  }

  customerSummary: { name: string; total: number }[] = [];

  fetchCustomer() {
    this.customerServices.getList({
      skipCount: 0,
      maxResultCount: 100
    }).subscribe((res) => {

      this.customers = res.items ?? [];
      this.customer_count = res.totalCount ?? 0

      this.customerSummary = [...this.customers]
        .sort((a, b) => (b.totalAmount ?? 0) - (a.totalAmount ?? 0))
        .slice(0, 5)
        .map(customer => ({
          name: customer.name ?? '',
          total: customer.totalAmount ?? 0
        }));
    })

  }

  fetchOrder() {
    this.isLoading = true
    this.orderService.getList({
      skipCount: 0, maxResultCount: 100
    }).subscribe(res => {
      const order = res.items ?? [];

      const uniqueVendor = new Set(
        order.map(b => b.vendorName)
      )
      this.vendor_count = uniqueVendor.size
      this.isLoading = false
    })
  }


  cards = [
    { id: 'product', route: '/product' },
    { id: 'bill', route: '/bill' },
    { id: 'vendor', route: '/vendor' },
    { id: 'customer', route: '/user' }
  ];
  
  listCards = [
    { id: 'products' },
    { id: 'bills' },
    { id: 'customers' }
  ];

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  }

  dropList(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.listCards, event.previousIndex, event.currentIndex);
  }

}



