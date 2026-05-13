import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BillCardComponent } from 'src/app/Component/bill-card/bill-card.component';
import { BillDto } from '@proxy/dtos/bill';
import { BillService } from '@proxy/services/bill-services';
import { CustomerServicesService } from '@proxy/services/customer-services';
import { CustomerDto } from '@proxy/dtos/customer';
import { UserCardComponent } from 'src/app/Component/user-card/user-card.component';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, BillCardComponent, UserCardComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnInit {

  billServices = inject(BillService);
  customerServices = inject(CustomerServicesService)

  bills: BillDto[] = [];
  filteredBills: BillDto[] = [];

  customers: CustomerDto[] = [];
  filterCustomers: CustomerDto[] = [];

  selectedMonth: string = '';
  selectCustomerMonth: string = '';

  months = [
    { value: '0', name: 'January' },
    { value: '1', name: 'February' },
    { value: '2', name: 'March' },
    { value: '3', name: 'April' },
    { value: '4', name: 'May' },
    { value: '5', name: 'June' },
    { value: '6', name: 'July' },
    { value: '7', name: 'August' },
    { value: '8', name: 'September' },
    { value: '9', name: 'October' },
    { value: '10', name: 'November' },
    { value: '11', name: 'December' },
  ];

  ngOnInit(): void {
    this.fetchBills()
    this.fetchCustomer()
  }

  fetchBills() {
    this.billServices.getList({
      skipCount: 0,
      maxResultCount: 100,
    }).subscribe((res) => {
      this.bills = res.items ?? [];
      this.filteredBills = [...this.bills];
      console.log(this.bills);
    });
  }



  filterBillByMonth(): void {
    if (this.selectedMonth === '') {
      this.filteredBills = [...this.bills];
      return;
    }
    this.filteredBills = this.bills.filter((bill) => {
      if (!bill.creationTime) {
        return false;
      }
      const billMonth = new Date(bill.creationTime).getMonth();
      return billMonth === Number(this.selectedMonth);
    });

  }


  fetchCustomer() {
    this.customerServices.getList({
      skipCount: 0,
      maxResultCount: 100
    }).subscribe((res) => {

      this.customers = res.items ?? [];
      this.filterCustomers = [...this.customers];
    });
  }


  fetchCustomerByMonth(): void {
    if (this.selectCustomerMonth === '') {
      this.filterCustomers = [...this.customers];
      return;
    }
    this.filterCustomers = this.customers.filter((customer) => {
      if (!customer.creationTime) {
        return false;
      }
      const customerMonth = new Date(
        customer.creationTime
      ).getMonth();
      return customerMonth === Number(this.selectCustomerMonth);
    });
  }


}