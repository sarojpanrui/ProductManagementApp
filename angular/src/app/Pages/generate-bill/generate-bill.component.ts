import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { BillService } from '@proxy';
import {
  CardComponent,
  CardBodyComponent
} from '@abp/ng.theme.shared';
import { BillDto } from '@proxy/dtos/bill';
import { ProductDto } from '@proxy/dtos/product';
import { ProductServicesService } from '@proxy/services/product-services';
import { ModalComponent } from '@abp/ng.theme.shared';
import { FormsModule } from '@angular/forms';
import { ToasterService } from '@abp/ng.theme.shared';
import { CommonModule } from '@angular/common';
import { CustomerServicesService } from '@proxy/services/customer-services';
import { CustomerAmountProductDto, CustomerDto } from '@proxy/dtos/customer';

@Component({
  selector: 'app-generate-bill',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardBodyComponent,
    CardComponent, ModalComponent, FormsModule, CommonModule
  ],
  templateUrl: './generate-bill.component.html',
  styleUrl: './generate-bill.component.scss',
})
export class GenerateBillComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly billService = inject(BillService);
  private readonly productService = inject(ProductServicesService)
  private readonly toast = inject(ToasterService)
  private readonly customerServices = inject(CustomerServicesService)

  bills: BillDto[] = [];
  form!: FormGroup;
  products: ProductDto[] = [];
  customers: CustomerDto[] = []

  isOpen: boolean = false
  isLoading: boolean = false;

  pageIndex = 1;
  pageSize = 5;

  ngOnInit(): void {
    this.buildForm();
    this.fetchBills();
    this.fetchProducts()
    this.fetchCustomers()
  }

  fetchBills(): void {
    this.billService.getList().subscribe((res) => {
      this.bills = res;
    });
  }

  fetchProducts(): void {
    this.isLoading = true
    this.productService.getProducts({
      skipCount: 0,
      maxResultCount: 100
    }).subscribe((res) => {
      this.products = res.items ?? [];
      this.isLoading = false
    })
  }

  fetchCustomers(): void {
    this.isLoading = true;
    this.customerServices.getList({
      skipCount: 0,
      maxResultCount: 100
    }).subscribe((res) => {
      this.customers = res.items ?? []

    })
  }


  buildForm(): void {
    this.form = this.fb.group({
      customer: ['', Validators.required],
      customerId: ['', Validators.required],
      totalAmount: [0, Validators.required],
      buyProducts: ['', Validators.required],
      productSearch: ['']
    });
  }

  selectedProducts: ProductDto[] = [];
  productSearch: string = '';

  addProduct(product: any) {
    this.selectedProducts.push(product);
    this.updateForm();
  }

  removeProduct(product: ProductDto) {
    const index = this.selectedProducts.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.selectedProducts.splice(index, 1);
    }
    this.updateForm();
  }

  updateForm() {
    const data = this.selectedProducts.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price
    }));
    const total = this.selectedProducts.reduce((sum, p) => sum + (p.price || 0), 0);
    this.form.patchValue({
      buyProducts: JSON.stringify(data),
      totalAmount: total
    });
  }

  get filteredProductList() {
    const search = this.form.get('productSearch')?.value?.toLowerCase() || '';
    return this.products.filter(p =>
      p.name?.toLowerCase().includes(search)
    );
  }

  selectedCustomer: CustomerDto | null = null;

  customerSearch: string = '';

  selectCustomer(customer: CustomerDto) {

    this.selectedCustomer = customer;

    this.form.patchValue({
      customer: customer.name,
      customerId: customer.id
    });
  }


  removeCustomer() {
    this.selectedCustomer = null;
    this.form.patchValue({
      customer: ''
    });
  }

  get filteredCustomers() {
    const search =
      this.customerSearch.toLowerCase();
    return this.customers.filter(c =>
      c.name?.toLowerCase().includes(search)
    );
  }

  // create(): void {
  //   if (this.form.invalid) return;
  //   this.billService.create(this.form.value).subscribe(() => {
  //     this.toast.success('Bill added...');
  //     this.fetchBills();
  //     this.form.reset({
  //       customer: '',
  //       totalAmount: 0,
  //       buyProducts: '',
  //     });
  //   });
  // }

  create(): void {

    if (this.form.invalid || !this.selectedCustomer) {
      return;
    }

    this.billService.create(this.form.value).subscribe(() => {

      // Previous total amount
      const oldAmount =
        this.selectedCustomer?.totalAmount ?? 0;

      // Current bill total
      const currentAmount =
        this.form.value.totalAmount ?? 0;

      // Final total amount
      const total =
        oldAmount + currentAmount;

      // Previous products
      const oldProducts =
        this.selectedCustomer?.products ?? '';

      // New selected products
      const newProducts =
        this.selectedProducts
          .map(p => p.id)
          .join(', ');

      // Merge products
      const products =
        oldProducts
          ? oldProducts + ', ' + newProducts
          : newProducts;

      // DTO
      const data: CustomerAmountProductDto = {
        totalAmount: total,
        products: products
      };
      // Update customer table
      this.customerServices
        .updateAmountProductByIdAndInput(
          this.selectedCustomer?.id!,
          data
        )
        .subscribe(() => {
          this.toast.success('Bill added successfully');
          // Refresh data
          this.fetchBills();
          this.fetchProducts();
          this.fetchCustomers();

          // Reset form
          this.form.reset({
            customer: '',
            customerId: '',
            totalAmount: 0,
            buyProducts: '',
            productSearch: ''
          });
          // Clear selections
          this.selectedProducts = [];
          this.selectedCustomer = null;
        });
    });
  }
}