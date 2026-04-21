import { Component, inject } from '@angular/core';
import { BillService } from '@proxy';
import { BillDto } from '@proxy/dtos';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  billService = inject(BillService);
  bills: BillDto[] = [];

  ngOnInit() {
    this.fetchBills();

  }

  fetchBills() {
    this.billService.getList().subscribe((res) => {
      this.bills = res;
      console.log(this.bills)
      this.extractCustomerSummary(res)
    })
  }

  searchText: string = '';

  get filteredCustomers() {
    const search = this.searchText.toLowerCase();
    return this.customerSummary.filter(c =>
      c.name.toLowerCase().includes(search)
    );
  }

  customerSummary: { name: string; total: number }[] = [];

  extractCustomerSummary(bills: BillDto[]) {
    const map = new Map<string, number>();

    bills.forEach(b => {
      const name = b.customer?.trim();
      if (!name) return;

      map.set(name, (map.get(name) || 0) + (b.totalAmount || 0));
    });

    this.customerSummary = Array.from(map, ([name, total]) => ({ name, total }));
  }

 

}
