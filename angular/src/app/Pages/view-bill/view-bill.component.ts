import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillService } from '@proxy';
import { BillDto, ProductDto } from '@proxy/dtos';
import { DatePipe } from '@angular/common';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface SelectedProduct {
  id: string;
  name: string;
}


@Component({
  selector: 'app-view-bill',
  standalone: true,
  templateUrl: './view-bill.component.html',
  styleUrl: './view-bill.component.scss',
  imports: [
    DatePipe
  ]
})
export class ViewBillComponent {
  private route = inject(ActivatedRoute);
  private billService = inject(BillService);

  bill?: BillDto;
  today: Date = new Date();

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.billService.get(id).subscribe(res => {
      this.bill = res;
      // console.log('BUY PRODUCTS RAW:', this.bill.buyProducts); 

      this.parseProducts(); 
    });
  }


  parsedProducts: SelectedProduct[] = [];
  parseProducts() {
    try {
      const data = this.bill?.buyProducts;

      this.parsedProducts = data ? JSON.parse(data) : [];
    } catch {
      this.parsedProducts = [];
    }
  }



  printInvoice(): void {
    window.print();
  }
  downloadPDF(): void {
    const element = document.getElementById('invoice');

    if (!element || !this.bill) return;

    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');

      const pageWidth = 210;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeight);

      // pdf.save(`invoice-${this.bill.id}.pdf`);
    });
  }
}
