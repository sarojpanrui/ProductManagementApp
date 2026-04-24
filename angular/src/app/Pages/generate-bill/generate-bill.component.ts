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
import { ProductServicesService } from '@proxy';
import { ModalComponent } from '@abp/ng.theme.shared';
import { FormsModule } from '@angular/forms';
import { ToasterService } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-generate-bill',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardBodyComponent,
    CardComponent, ModalComponent, FormsModule
  ],
  templateUrl: './generate-bill.component.html',
  styleUrl: './generate-bill.component.scss',
})
export class GenerateBillComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly billService = inject(BillService);
  private readonly productService = inject(ProductServicesService)
  private readonly toast=inject(ToasterService)

  bills: BillDto[] = [];
  form!: FormGroup;
  products: ProductDto[] = [];

  isOpen: boolean = false

  ngOnInit(): void {
    this.buildForm();
    this.fetchBills();
    this.fetchProducts()
  }

  fetchBills(): void {
    this.billService.getList().subscribe((res) => {
      this.bills = res;
    });
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
    })
  }

  buildForm(): void {
    this.form = this.fb.group({
      customer: ['', Validators.required],
      totalAmount: [0, Validators.required],
      buyProducts: ['', Validators.required],
      productSearch: ['']
    });
  }

  create(): void {
    if (this.form.invalid) return;

    this.billService.create(this.form.value).subscribe(() => {
      this.toast.success('Bill added...');
      this.fetchBills(); // refresh list after create

      this.form.reset({
        customer: '',
        totalAmount: 0,
        buyProducts: '',
      });
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




}