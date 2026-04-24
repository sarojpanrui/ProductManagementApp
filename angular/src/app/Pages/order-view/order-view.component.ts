import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '@proxy';
import { OrderDto } from '@proxy/dtos/order';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-view',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './order-view.component.html',
  styleUrl: './order-view.component.scss',
})
export class OrderViewComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);

  order?: OrderDto;
  parsedProducts: any[] = [];



  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.orderService.get(id).subscribe(res => {
      this.order = res;

      if (this.order?.buyProducts) {
        try {
          this.parsedProducts = JSON.parse(this.order.buyProducts);
        } catch (e) {
          console.error('Invalid JSON in products', e);
          this.parsedProducts = [];
        }
      }
    });
  }

  fetchOrder(id: string) {
    this.orderService.get(id).subscribe({
      next: (res) => {
        this.order = res;
        console.log(res)
      },
      error: (err) => {
        console.error('Failed to fetch order', err);
      }
    });
  }

  downloadPDF(): void {
    const element = document.getElementById('invoice');

    if (!element || !this.order) return;

    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');

      const pageWidth = 210;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeight);

      pdf.save(`invoice.pdf`);
    });
  }

  today = new Date();

  printReceipt() {
    const content = document.getElementById('receipt')?.innerHTML;
    const win = window.open('', '', 'width=900,height=700');

    if (win && content) {
      win.document.write(`
      <html>
        <head>
          <title>Receipt</title>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);
      win.document.close();
      win.print();
    }
  }
}