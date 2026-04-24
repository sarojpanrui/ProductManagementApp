import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject
} from '@angular/core';
import {
  CardComponent,
  CardBodyComponent,
  Confirmation,
  ConfirmationService,
  ModalComponent
} from '@abp/ng.theme.shared';
// import { BillDto } from '@proxy/dtos';
import { BillDto } from '@proxy/dtos/bill';
import { BillService } from '@proxy';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToasterService } from '@abp/ng.theme.shared';



@Component({
  selector: 'app-bill-card',
  standalone: true,
  imports: [
    CardComponent,
    CardBodyComponent,
    ModalComponent,
    ReactiveFormsModule,
    RouterLink
],
  templateUrl: './bill-card.component.html',
  styleUrl: './bill-card.component.scss',
})
export class BillCardComponent {
  @Input() bill!: BillDto;
  @Output() deleted = new EventEmitter<void>();
  @Output() updated = new EventEmitter<void>();

  isOpen = false;
  form!: FormGroup;

  private readonly fb = inject(FormBuilder);
  private readonly billService = inject(BillService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly toast=inject(ToasterService)

  constructor() {
    this.form = this.fb.group({
      customer: ['', Validators.required],
      totalAmount: [0, Validators.required],
      buyProducts: ['', Validators.required],
    });
  }

  delete(id: string): void {
    const options: Partial<Confirmation.Options> = {
      cancelText: 'Cancel',
      yesText: 'Delete',
      icon: 'fa fa-trash text-danger',
    };

    this.confirmation
      .warn('Do you really want to delete this bill?', 'Delete Bill', options)
      .subscribe(status => {
        if (status === Confirmation.Status.confirm) {
          this.billService.delete(id).subscribe(() => {
            this.toast.success("Deleted Successfully")
            this.deleted.emit();
          });
        }
      });
  }

  openEditForm(): void {
  console.log('Bill object:', this.bill);
  console.log('Bill ID:', this.bill.id);

  this.form.patchValue({
    customer: this.bill.customer,
    totalAmount: this.bill.totalAmount,
    buyProducts: this.bill.buyProducts,
  });

  this.isOpen = true;
}

  closeForm(): void {
    this.isOpen = false;
  }

 edit(id:string): void {
 

  if (this.form.invalid) return;

  this.billService.update(id, this.form.value).subscribe(() => {
    this.isOpen = false;
    this.toast.success("update successfully")
    this.updated.emit();
  });
}
}