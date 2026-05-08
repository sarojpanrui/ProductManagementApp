import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ModalComponent } from '@abp/ng.theme.shared';

import { UserCardComponent } from 'src/app/Component/user-card/user-card.component';

import {
  CustomerCreateDto,
  CustomerDto
} from '@proxy/dtos/customer';

import { CustomerServicesService }
  from '@proxy/services/customer-services/customer-services.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ModalComponent,
    UserCardComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {

  customerServices = inject(CustomerServicesService);

  private readonly fb = inject(FormBuilder);

  customers: CustomerDto[] = [];

  form!: FormGroup;

  pageIndex = 1;
  pageSize = 8;
  totalCustomers = 0;

  isLoading = false;
  isOpen = false;

  searchText: string = '';

  ngOnInit() {
    this.buildForm();
    this.fetchCustomers();
  }

  fetchCustomers() {

    this.isLoading = true;

    this.customerServices.getList({
      skipCount: (this.pageIndex - 1) * this.pageSize,
      maxResultCount: this.pageSize
    }).subscribe({
      next: (res) => {
        this.customers = res.items ?? [];
        this.totalCustomers = res.totalCount ?? 0;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  get filteredCustomers(): CustomerDto[] {

    const search = this.searchText.toLowerCase();

    return this.customers.filter(c =>
      c.name?.toLowerCase().includes(search)
    );
  }

  nextPage() {
    if (this.pageIndex * this.pageSize < this.totalCustomers) {
      this.pageIndex++;
      this.fetchCustomers();
    }
  }

  prevPage() {
    if (this.pageIndex > 1) {
      this.pageIndex--;
      this.fetchCustomers();
    }
  }

  openModal() {
    this.isOpen = true;
  }

  buildForm() {

    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  create() {

    if (this.form.invalid) return;

    const input = this.form.value as CustomerCreateDto;

    this.customerServices.create(input).subscribe(() => {

      this.isOpen = false;

      this.form.reset();

      this.fetchCustomers();
    });
  }
}