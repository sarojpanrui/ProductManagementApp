import { Component } from '@angular/core';
import { BarChartComponent } from 'src/app/Component/bar-chart/bar-chart.component';
import { PieChartComponent } from 'src/app/Component/pie-chart/pie-chart.component';
import { VisitedCustomerComponent } from 'src/app/Component/visited-customer/visited-customer.component';
import { TopsellingProductComponent } from 'src/app/Component/topselling-product/topselling-product.component';
import html2canvas from 'html2canvas';
import { BillMonthComponent } from 'src/app/Component/bill-month/bill-month.component';
import { CustomerMonthComponent } from 'src/app/Component/customer-month/customer-month.component';

@Component({
  selector: 'app-statistics',
  imports: [BarChartComponent , PieChartComponent, VisitedCustomerComponent,TopsellingProductComponent,BillMonthComponent,CustomerMonthComponent],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent {
  downloadDashboard() {

    const dashboard =
      document.getElementById('dashboardContent');

    if (!dashboard) return;

    html2canvas(dashboard, {
      scale: 2,
      useCORS: true
    }).then((canvas) => {

      const image = canvas.toDataURL('image/png');

      const link = document.createElement('a');

      link.href = image;

      link.download = 'report.png';

      link.click();
    });
  }
}
