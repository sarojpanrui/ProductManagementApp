import { Component, inject } from '@angular/core';
import { OrderService } from '@proxy/services/order-services';
import { OrderDto } from '@proxy/dtos/order';
import { FormsModule } from '@angular/forms';
// import { UserCardComponent } from 'src/app/Component/user-card/user-card.component';
import { VendorCardComponent } from 'src/app/Component/vendor-card/vendor-card.component';

@Component({
  selector: 'app-vendor',
  imports: [FormsModule,VendorCardComponent],
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.scss',
})
export class VendorComponent {
  order: OrderDto[] = [];

  orderService = inject(OrderService);

  ngOnInit() {
    this.fetchOrder()

  }

  fetchOrder() {
    this.orderService.getList().subscribe((res) => {
      this.order = res;
      this.extractVendorSummary(res)
    })
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
    console.log(this.vendorSummary)
  }
}
