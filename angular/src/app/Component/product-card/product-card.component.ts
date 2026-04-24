import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { ProductDto } from '@proxy/dtos/product';
import { ProductServicesService } from '@proxy';
import {
  CardComponent,
  CardBodyComponent,
  CardTitleDirective,
  CardSubtitleDirective,
  ModalComponent
} from '@abp/ng.theme.shared';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToasterService } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CardComponent,
    CardBodyComponent,
    CardTitleDirective,
    CardSubtitleDirective,
    ModalComponent,
    ReactiveFormsModule, CommonModule
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit {
  @Input() product!: ProductDto;
  @Output() deleted = new EventEmitter<string>();
  @Output() updated = new EventEmitter<void>();

  readonly productServices = inject(ProductServicesService);
  private readonly fb = inject(FormBuilder);
  private readonly toast=inject(ToasterService)

  isOpen = false;
  form!: FormGroup;

  viewOpen: boolean = false;
  selectedProduct!: ProductDto;

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
    });
  }

  onDelete(id: string): void {
    this.deleted.emit(id);
  }

  openEditForm(): void {
    this.form.patchValue({
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      quantity: this.product.quantity,
    });

    this.isOpen = true;
  }

  closeForm(): void {
    this.isOpen = false;
  }

  Edit(id: string): void {
    if (this.form.invalid) return;

    this.productServices.updateProduct(id, this.form.value).subscribe(() => {
      this.isOpen = false;
      this.toast.success("update successfully")
      this.updated.emit();
    });
  }

  openView(product: ProductDto) {
    this.selectedProduct = product;
    this.viewOpen = true;
  }

  closeView() {
    this.viewOpen = false;
  }
}