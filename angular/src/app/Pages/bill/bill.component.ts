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
import { BillDto } from '@proxy/dtos';
import { BillCardComponent } from 'src/app/Component/bill-card/bill-card.component';
import { RouterLink } from '@angular/router';
import { ModalComponent } from '@abp/ng.theme.shared';
import { FormsModule } from '@angular/forms';
import { ProductServicesService } from '@proxy';


@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardComponent,
    CardBodyComponent,
    BillCardComponent, RouterLink, ModalComponent, FormsModule
  ],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.scss',
})
export class BillComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly billService = inject(BillService);
  private readonly productService=inject(ProductServicesService)
  bills: BillDto[] = [];



  form!: FormGroup;
  searchText = ''

  ngOnInit(): void {
    this.buildForm();
    this.fetchBills();
  }

  fetchBills(): void {
    this.billService.getList().subscribe((res) => {
      this.bills = res;
    })
  }

  buildForm() {
    this.form = this.fb.group({
      customer: ['', Validators.required],
      totalAmount: [0, Validators.required],
      buyProducts: ['', Validators.required],
    });
  }

  create(): void {
    if (this.form.invalid) return;

    this.billService.create(this.form.value).subscribe(() => {
      console.log('Bill added...');

      this.form.reset({
        customer: '',
        totalAmount: 0,
        buyProducts: '',
      });
    });
  }

  get filteredBills() {
    if (!this.searchText) return this.bills;

    return this.bills.filter(p =>
      (p.customer || '')
        .toLowerCase()
        .includes(this.searchText.toLowerCase())
    );
  }


}