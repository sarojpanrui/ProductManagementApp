import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService, ProductServicesService } from '@proxy';
import { OrderDto } from '@proxy/dtos/order';
import { ProductDto } from '@proxy/dtos/product';
import { OrderCardComponent } from 'src/app/Component/order-card/order-card.component';
import { ModalComponent, ModalCloseDirective, ToasterService } from '@abp/ng.theme.shared';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    OrderCardComponent,
    ModalComponent,
    ModalCloseDirective,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {

  orderService = inject(OrderService);
  productService = inject(ProductServicesService);
  private fb = inject(FormBuilder);
  toast = inject(ToasterService);

  form!: FormGroup;

  orders: OrderDto[] = [];
  products: ProductDto[] = [];

  selectedProducts: ProductDto[] = [];

  isModalOpen = false;

  searchText: string = '';
  productSearch: string = '';

  ngOnInit() {
    this.buildForm();
    this.fetchOrder();
    this.fetchProducts();
  }

  // ================= FORM =================
  buildForm(): void {
    this.form = this.fb.group({
      vendorName: ['', Validators.required],
      totalAmount: [0, Validators.required],
      buyProducts: ['', Validators.required],
      orderDate: [new Date(), Validators.required],
      deliveryDate: [],
      isReceived: [false]
    });
  }

  // ================= FETCH =================
  fetchOrder() {
    this.orderService.getList().subscribe(res => {
      this.orders = res;
    });
  }

  // fetchProducts() {
  //   this.productService.getList().subscribe(res => {
  //     this.products = res;
  //   });
  // }

  fetchProducts(){
    this.productService.getProducts().subscribe(res=>{
      this.products=res;
    })
  }

  // ================= MODAL =================
  OpenModal() {
    this.isModalOpen = true;
    this.selectedProducts = [];
    this.productSearch = '';

    this.form.reset({
      vendorName: '',
      totalAmount: 0,
      buyProducts: '',
      orderDate: new Date(),
      deliveryDate: null,
      isReceived: false
    });
  }

  // ================= CREATE =================
  Create(): void {
    if (this.form.invalid) return;

    this.orderService.create(this.form.value).subscribe(() => {
      this.fetchOrder();
      this.toast.success("Order added successfully");
      this.isModalOpen = false;
    });
  }

  // ================= ORDER SEARCH =================
  get filterOrder() {
    const search = this.searchText?.toLowerCase() || '';

    return this.orders.filter(ord =>
      ord.vendorName?.toLowerCase().includes(search) ||
      ord.buyProducts?.toLowerCase().includes(search)
    );
  }

  // ================= PRODUCT SEARCH =================
  get filteredProductList() {
    const search = this.productSearch?.toLowerCase() || '';

    return this.products
      .filter(p => p.name?.toLowerCase().includes(search))
      .filter(p => !this.selectedProducts.some(sp => sp.id === p.id));
  }

  // ================= PRODUCT SELECT =================
  addProduct(product: ProductDto) {
    const exists = this.selectedProducts.some(p => p.id === product.id);
    if (exists) return;

    this.selectedProducts.push(product);
    this.productSearch = '';
    this.updateForm();
  }

  removeProduct(product: ProductDto) {
    this.selectedProducts = this.selectedProducts.filter(p => p.id !== product.id);
    this.updateForm();
  }

  // ================= UPDATE FORM =================
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
}