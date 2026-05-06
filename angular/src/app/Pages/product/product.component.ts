import { Component, inject, OnInit } from '@angular/core';
import { CreateProductDto } from '@proxy/dtos/product';
import { ProductDto } from '@proxy/dtos/product';
import { ProductCardComponent } from 'src/app/Component/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { ModalComponent } from '@abp/ng.theme.shared';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToasterService } from '@abp/ng.theme.shared';
import { GetProductListDto } from '@proxy/dtos/product';
import { ProductServicesService } from '@proxy/services/product-services';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ProductCardComponent, FormsModule, ModalComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})



export class ProductComponent implements OnInit {
  readonly productServices = inject(ProductServicesService);

  private confirmation = inject(ConfirmationService);
  private readonly fb = inject(FormBuilder);
  toast = inject(ToasterService)

  isLoading: boolean = false;

  isOpen: boolean = false;
  isEditOpen: boolean = false;
  form!: FormGroup;
  quantityFilter: string = '';

  products: ProductDto[] = [];
  totalProducts: number = 0;
  searchText = '';

  pageIndex = 1;
  pageSize = 8;


  newProduct: CreateProductDto = {
    name: '',
    description: '',
    price: 0,
    quantity: 0,
  };


  ngOnInit(): void {
    this.buildForm();
    this.fetchProduct();
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



  // fetchProduct() {
  //   const page: GetProductListDto = {
  //     skipCount: 0,
  //     maxResultCount: 100
  //   };
  //   this.productServices.getProducts(page).subscribe(res => {
  //     this.products = res.items ?? [];
  //   });
  // }


  fetchProduct() {
    this.isLoading = true;
    const page: GetProductListDto = {
      skipCount: (this.pageIndex - 1) * this.pageSize,
      maxResultCount: this.pageSize
    };
    this.productServices.getProducts(page).subscribe(res => {
      this.products = res.items ?? [];
      this.totalProducts = res.totalCount ?? 0;
      this.isLoading = false;
    });
  }

  nextPage() {
    if (this.pageIndex * this.pageSize < this.totalProducts) {
      this.pageIndex++;
      this.fetchProduct();
    }
  }

  prevPage() {
    if (this.pageIndex > 1) {
      this.pageIndex--;
      this.fetchProduct();
    }
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
