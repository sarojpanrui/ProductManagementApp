import { Component } from '@angular/core';
import { ProductServicesService } from '@proxy';
import { inject } from '@angular/core';
import { BillDto, ProductDto } from '@proxy/dtos';
import { BillService } from '@proxy';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',

})
export class DashboardComponent {
  productService = inject(ProductServicesService);
  billService = inject(BillService);

  products: ProductDto[] = [];
  bills: BillDto[] = [];

  recentBills: BillDto[] = [];
  recentProducts: ProductDto[] = [];

  product_count: number = 0;
  bill_count: number = 0;
  total_bill_amount: number = 0;
  customer_count: number = 0;

  ngOnInit() {
    this.fetchProducts();
    this.fetchBills();
    this.fetchCustomer()
  }

  fetchProducts() {
    this.productService.getProducts().subscribe(res => {
      this.products = res;
      console.log(this.products)
      this.product_count = res.length;

      this.recentProducts = [...res]
        .sort((a, b) =>
          new Date(b.createTime ?? '').getTime() - new Date(a.createTime ?? '').getTime()
        )
        .slice(0, 5);
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
    this.billService.getList().subscribe(res => {

      const filtered = this.filterBillsByDate(res);

      this.bills = filtered;

      this.bill_count = filtered.length;

      this.total_bill_amount = filtered.reduce(
        (sum, bill) => sum + (bill.totalAmount ?? 0),
        0
      );

      this.recentBills = [...filtered]
        .sort((a, b) =>
          new Date(b.createTime ?? '').getTime() -
          new Date(a.createTime ?? '').getTime()
        )
        .slice(0, 5);
      this.extractTop5CustomerExpenditure(filtered);
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
    this.billService.getList().subscribe(res => {

      const bills = res;

      // Extract unique customer names
      const uniqueCustomers = new Set(
        bills.map(b => b.customer)
      );

      this.customer_count = uniqueCustomers.size;
      console.log(this.customer_count)

    });
  }


}
