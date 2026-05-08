import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';

import {
  ModalComponent,
  ToasterService
} from '@abp/ng.theme.shared';

import {
  CustomerCreateDto,
  CustomerDto
} from '@proxy/dtos/customer';

import {
  CustomerServicesService
} from '@proxy/services/customer-services';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ModalComponent,
    ReactiveFormsModule
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent implements OnInit {

  @Input() customer!: CustomerDto;

  @Output() deleted = new EventEmitter<void>();

  @Output() updated = new EventEmitter<void>();

  private readonly fb = inject(FormBuilder);

  customerServices = inject(CustomerServicesService);

  toast = inject(ToasterService);

  isOpen = false;

  form!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {

    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  delete(id: string | undefined) {

    if (!id) return;

    this.customerServices.delete(id).subscribe(() => {

      this.deleted.emit();

      this.toast.success('Customer deleted successfully');

    });
  }

  openEdit() {

    this.isOpen = true;

    this.form.patchValue({
      name: this.customer?.name,
      address: this.customer?.address,
      phone: this.customer?.phone,
      email: this.customer?.email
    });
  }

  update() {

    if (this.form.invalid || !this.customer?.id) {
      return;
    }

    const input: CustomerCreateDto = {
      name: this.form.value.name,
      address: this.form.value.address,
      phone: this.form.value.phone,
      email: this.form.value.email
    };

    this.customerServices
      .update(this.customer.id, input)
      .subscribe(() => {

        this.toast.success('Customer updated successfully');

        this.isOpen = false;

        this.updated.emit();
      });
  }
}