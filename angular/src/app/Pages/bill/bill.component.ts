import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { BillService } from '@proxy/services/bill-services';
import {
  CardComponent,
  CardBodyComponent
} from '@abp/ng.theme.shared';
import { BillDto } from '@proxy/dtos/bill';
import { BillCardComponent } from 'src/app/Component/bill-card/bill-card.component';
import { RouterLink } from '@angular/router';
import { ModalComponent } from '@abp/ng.theme.shared';
import { FormsModule } from '@angular/forms';
import { ProductServicesService } from '@proxy';
import { ToasterService } from '@abp/ng.theme.shared';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardComponent,
    CardBodyComponent,
    BillCardComponent, RouterLink, ModalComponent, FormsModule,CommonModule
  ],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.scss',
})
export class BillComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly billService = inject(BillService);
  private readonly productService=inject(ProductServicesService)
  private readonly toast=inject(ToasterService)

  bills: BillDto[] = [];
  form!: FormGroup;
  searchText = ''

  pageIndex=1;
  pageSize=8;
  totalBills=0;

  isLoading:boolean=false;

  ngOnInit(): void {
    this.buildForm();
    this.fetchBills();
  }

  fetchBills(): void { 
    this.isLoading=true
    this.billService.getList({
      skipCount: (this.pageIndex - 1) * this.pageSize,
      maxResultCount: this.pageSize
    }).subscribe((res) => {
      this.bills = res.items?? [];
      this.totalBills=res.totalCount?? 0;
      this.isLoading=false;
    })
  }

  nextPage(){
    if(this.pageIndex * this.pageSize < this.totalBills){
      this.pageIndex++;
      this.fetchBills()
    }
  }
  prevPage(){
    if(this.pageIndex>1){
      this.pageIndex--;
      this.fetchBills();
    }
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
      this.toast.success('Bill added...');

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