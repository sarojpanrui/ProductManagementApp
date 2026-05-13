import { Component, inject } from '@angular/core';
import { OrderService } from '@proxy/services/order-services';
import { OrderDto } from '@proxy/dtos/order';
import { FormsModule } from '@angular/forms';
import { VendorCardComponent } from 'src/app/Component/vendor-card/vendor-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vendor',
  imports: [FormsModule, VendorCardComponent,CommonModule],
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.scss',
})
export class VendorComponent {
  order: OrderDto[] = [];

  pageSize = 12;
  pageIndex = 1;
  totalOrders = 0;

  isLoading:boolean = false;

  orderService = inject(OrderService);

  ngOnInit() {
    this.fetchOrder()
  }

  fetchOrder() {
    this.isLoading=true;
    this.orderService.getList({
      skipCount: (this.pageIndex - 1) * this.pageSize,
      maxResultCount: this.pageSize
    }).subscribe((res) => {
      this.order = res.items ?? [];
      this.totalOrders = res.totalCount ?? 0;
      this.extractVendorSummary(res.items ?? [])
      this.isLoading=false;
    })
  }

  nextPage() {
    if (this.pageIndex * this.pageSize < this.totalOrders) {
      this.pageIndex++;
      this.fetchOrder();
    }
  }

  prevPage() {
    if (this.pageIndex > 1) {
      this.pageIndex--;
      this.fetchOrder();
    }
  }

  searchText: string = '';

  get filteredOrders() {
    const search = this.searchText.toLowerCase();
    return this.vendorSummary.filter(c =>
      c.name.toLocaleLowerCase().includes(search)
    );
  }

  vendorSummary: { name: string, total: number }[] = [];

  extractVendorSummary(order: OrderDto[]) {
    const map = new Map<string, number>();

    order.forEach(ord => {
      const name = ord.vendorName?.trim();
      if (!name) return;

      map.set(name, (map.get(name) || 0) + (ord.totalAmount || 0));
    })

    this.vendorSummary = Array.from(map, ([name, total]) =>
      ({ name, total }))
    // console.log(this.vendorSummary)
  }
}
