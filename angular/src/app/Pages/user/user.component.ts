import { Component, inject } from '@angular/core';
import { BillService } from '@proxy/services/bill-services';
import { BillDto } from '@proxy/dtos/bill';
import { FormsModule } from '@angular/forms';
import { UserCardComponent } from 'src/app/Component/user-card/user-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule,UserCardComponent,CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  billService = inject(BillService);
  bills: BillDto[] = [];

  pageIndex=1;
  pageSize=14;
  totalBills=0;

  isLoading : boolean = false;

  ngOnInit() {
    this.fetchBills();
  }

  fetchBills() {
    this.isLoading=true
    this.billService.getList({
      skipCount: (this.pageIndex-1) * this.pageSize,
      maxResultCount:this.pageSize
    }).subscribe((res) => {
      this.bills = res.items ?? [];
      this.totalBills=res.totalCount??0;
      this.isLoading=false;
      this.extractCustomerSummary(res.items ?? [])
    })
  }
  nextPage() {
    if (this.pageIndex * this.pageSize < this.totalBills) {
      this.pageIndex++;
      this.fetchBills();
    }
  }

  prevPage() {
    if (this.pageIndex > 1) {
      this.pageIndex--;
      this.fetchBills();
    }
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
