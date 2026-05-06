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

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, RouterModule, DragDropModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',

})
export class DashboardComponent {
  productService = inject(ProductServicesService);
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

  isLoading : boolean=false;

  ngOnInit() {
    this.fetchProducts();
    this.fetchBills();
    this.fetchCustomer();
    this.fetchOrder()
  }

  fetchProducts() {
    this.isLoading=true;
    const input = {
      skipCount: 0,
      maxResultCount: 100
    };
    this.productService.getProducts(input).subscribe(res => {
      this.products = res.items ?? [];
      this.product_count = res.totalCount ?? 0;
      console.log(res.items)
      this.recentProducts = this.products.slice(-5).reverse();
      this.isLoading=false;
    });
  }

  dateFilter: 'all' | 'today' | 'month' | 'year' = 'all';

  filterBillsByDate(bills: BillDto[]) {
    const now = new Date();

    return bills.filter(bill => {
      if (!bill.createTime) return false;

      const billDate = new Date(bill.createTime);
      if (this.dateFilter === 'today') {
        return (
          billDate.getDate() === now.getDate() &&
          billDate.getMonth() === now.getMonth() &&
          billDate.getFullYear() === now.getFullYear()
        );
      }


      if (this.dateFilter === 'month') {
        return (
          billDate.getMonth() === now.getMonth() &&
          billDate.getFullYear() === now.getFullYear()
        );
      }
      if (this.dateFilter === 'year') {
        return billDate.getFullYear() === now.getFullYear();
      }

      return true;
    });
  }


  fetchBills() {
    this.isLoading=true;
    this.billService.getList({
      skipCount: 0,
      maxResultCount: 100,
    }).subscribe(res => {

      const filtered = this.filterBillsByDate(res.items ?? []);

      this.bills = filtered;

      this.bill_count = filtered.length;

      this.total_bill_amount = filtered.reduce(
        (sum, bill) => sum + (bill.totalAmount ?? 0),
        0
      );

      this.recentBills = [...res.items ?? []]
        .sort((a, b) =>
          new Date(b.createTime ?? '').getTime() -
          new Date(a.createTime ?? '').getTime()
        )
        .slice(0, 5);
      this.extractTop5CustomerExpenditure(filtered);
      // console.log(this.recentBills)
      this.isLoading=false;
    });
  }

  customerSummary: { name: string; total: number }[] = [];

  extractTop5CustomerExpenditure(bills: BillDto[]) {
    const map = new Map<string, number>();

    bills.forEach(b => {
      const name = b.customer?.trim();
      if (!name) return;

      map.set(name, (map.get(name) || 0) + (b.totalAmount || 0));
    });

    this.customerSummary = Array.from(map, ([name, total]) => ({
      name,
      total
    }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }

  fetchCustomer() {
    this.isLoading=true;
    this.billService.getList({
      skipCount: 0, maxResultCount: 100
    }).subscribe(res => {
      const bills = res.items ?? [];
      const uniqueCustomers = new Set(
        bills.map(b => b.customer)
      );
      this.customer_count = uniqueCustomers.size;
      // console.log(this.customer_count)
      this.isLoading=false;

    });
  }

  fetchOrder() {
    this.isLoading=true
    this.orderService.getList({
      skipCount: 0, maxResultCount: 100
    }).subscribe(res => {
      const order = res.items ?? [];

      const uniqueVendor = new Set(
        order.map(b => b.vendorName)
      )
      this.vendor_count = uniqueVendor.size
      console.log(this.vendor_count)
      this.isLoading=false
    })
  }

  
  cards = [
    { id: 'product', route: '/product' },
    { id: 'bill', route: '/bill' },
    { id: 'vendor', route:'/vendor' },
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



