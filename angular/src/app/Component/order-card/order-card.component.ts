import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { OrderDto } from '@proxy/dtos/order';
import { CommonModule } from '@angular/common';
import { OrderService } from '@proxy';
import { ModalComponent, ModalCloseDirective } from '@abp/ng.theme.shared';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToasterService } from '@abp/ng.theme.shared';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [
    CommonModule,

    ModalComponent,
    ModalCloseDirective,
    ReactiveFormsModule,RouterLink
  ],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss',
})

export class OrderCardComponent {

  @Input() order!: OrderDto;
  form!: FormGroup;

  @Output() received = new EventEmitter<string>();
  @Output() deleted = new EventEmitter<any>();

  orderService = inject(OrderService);
  private fb = inject(FormBuilder);
  toast = inject(ToasterService);
  confirmation = inject(ConfirmationService);

  isModalOpen = false;

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      vendorName: ['', Validators.required],
      totalAmount: [0, Validators.required],
      buyProducts: ['', Validators.required],
      orderDate: ['', Validators.required],
      deliveryDate: [''],
      isReceived: [false]
    });
  }

  openUpdateForm() {
    this.isModalOpen = true;


    this.form.patchValue({
      vendorName: this.order.vendorName,
      totalAmount: this.order.totalAmount,
      buyProducts: this.order.buyProducts,
      orderDate: this.order.orderDate,
      deliveryDate: this.order.deliveryDate,
      isReceived: this.order.isReceived
    });
  }

  Update(id: string): void {
    if (this.form.invalid) return;

    this.orderService.update(id, this.form.value).subscribe(() => {
      console.log('Updated successfully');

      this.isModalOpen = false;
      this.received.emit();
      this.toast.success("Update successfully")
    });
  }

  Received(id: string): void {
    this.orderService.receivedById(id).subscribe(() => {
      this.toast.success('Order received');
      this.received.emit();
    });
  }

  get products() {
    try {
      return this.order?.buyProducts
        ? JSON.parse(this.order.buyProducts)
        : [];
    } catch {
      return [];
    }
  }

  Delete(id: string): void {

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
          this.orderService.delete(id).subscribe(() => {
            this.toast.success("delete successfully");
            this.deleted.emit();
          });
        }
      });



  }
}