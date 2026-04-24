import { Component, inject, OnInit } from '@angular/core';
import { ProductServicesService } from '@proxy';
// import { CreateProductDto, ProductDto } from '@proxy/dtos';
import { CreateProductDto } from '@proxy/dtos/product';
import { ProductDto } from '@proxy/dtos/product';
import { ProductCardComponent } from 'src/app/Component/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { ModalComponent } from '@abp/ng.theme.shared';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToasterService } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ProductCardComponent, FormsModule, ModalComponent, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  readonly productServices = inject(ProductServicesService);
  private confirmation = inject(ConfirmationService);
  private readonly fb = inject(FormBuilder);
  toast = inject(ToasterService)

  isOpen: boolean = false;
  isEditOpen: boolean = false;
  form!: FormGroup;
  quantityFilter: string = '';

  products: ProductDto[] = [];
  searchText = '';

  newProduct: CreateProductDto = {
    name: '',
    description: '',
    price: 0,
    quantity: 0,
  };



  ngOnInit(): void {
    this.fetchProduct();
    this.buildForm();
  }

  delete(id: string): void {
    const options: Partial<Confirmation.Options> = {
      hideCancelBtn: false,
      hideYesBtn: false,
      dismissible: false,
      cancelText: 'Cancel',
      yesText: 'Delete',
      icon: 'fa fa-trash text-danger',
    };

    this.confirmation
      .warn('Do you really want to delete this product?', 'Delete Product', options)
      .subscribe(status => {
        if (status === Confirmation.Status.confirm) {
          this.productServices.deleteProduct(id).subscribe(() => {
            this.toast.success("Deleted Successfully")
            this.fetchProduct();
          });
        }
      });
  }

  // get filteredProducts() {
  //   return this.products.filter(p => p.name?.toLowerCase().includes(this.searchText.toLowerCase()));
  // }

  fetchProduct() {
    this.productServices.getProducts().subscribe(res => {
      this.products = res;
    });
  }

  openForm() {
    this.isOpen = true;
  }
  closeForm() {
    this.isOpen = false;
  }

  buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
    });
  }

  create(): void {
    if (this.form.invalid) return;

    this.productServices.createProduct(this.form.value).subscribe(() => {
      this.toast.success("Product added successfully")
      this.fetchProduct();
      this.closeForm();

      this.form.reset({
        name: '',
        description: '',
        price: 0,
        quantity: 0,
      });
    });
  }


  get filteredProducts() {
    return this.products.filter(p => {


      const matchesSearch = p.name!
        .toLowerCase()
        .includes(this.searchText?.toLowerCase() || '');


      let matchesQuantity = true;

      if (this.quantityFilter) {
        matchesQuantity = p.quantity! < Number(this.quantityFilter);
      }

      return matchesSearch && matchesQuantity;
    });
  }

}
