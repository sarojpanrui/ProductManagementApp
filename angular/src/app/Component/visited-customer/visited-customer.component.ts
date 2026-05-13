import { Component, inject, OnInit } from '@angular/core';
import { BillDto } from '@proxy/dtos/bill';
import { BillService } from '@proxy/services/bill-services';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexStroke,
  ApexFill,
  ApexLegend,
  ApexTooltip,
  ApexMarkers,
  ApexPlotOptions,
  ApexResponsive,
  ApexGrid,
  ApexAnnotations,
  ApexStates,
  ApexTheme,
  NgApexchartsModule,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis | ApexYAxis[];
  title?: ApexTitleSubtitle;
  subtitle?: ApexTitleSubtitle;
  dataLabels?: ApexDataLabels;
  stroke?: ApexStroke;
  fill?: ApexFill;
  legend?: ApexLegend;
  tooltip?: ApexTooltip;
  markers?: ApexMarkers;
  plotOptions?: ApexPlotOptions;
  responsive?: ApexResponsive[];
  grid?: ApexGrid;
  annotations?: ApexAnnotations;
  states?: ApexStates;
  theme?: ApexTheme;
  colors?: string[];
};

@Component({
  selector: 'app-visited-customer',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './visited-customer.component.html',
  styleUrl: './visited-customer.component.scss',
})
export class VisitedCustomerComponent implements OnInit {

  public chartOptions: Partial<ChartOptions> = {
    series: [
      {
        name: 'Bills',
        data: []
      }
    ],

    chart: {
      type: 'bar',
      height: 500
    },

    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: 'end',
        horizontal: true,
      }
    },

    dataLabels: {
      enabled: true
    },

    xaxis: {
      categories: []
    },

    title: {
      text: 'Top 5 Visited Customers'
    }
  };

  bills: BillDto[] = [];
  billService = inject(BillService);

  // customerName => total bill count
  customerBillCount: { [key: string]: number } = {};

  ngOnInit(): void {
    this.fetchBills();
  }

  fetchBills() {
    this.billService.getList({
      skipCount: 0,
      maxResultCount: 100
    }).subscribe((res) => {

      this.bills = res.items ?? [];

      this.calculateCustomerBills();
    });
  }

  calculateCustomerBills() {

    this.customerBillCount = {};

    // Count bills per customer
    this.bills.forEach((bill) => {

      const customerName = bill.customer;

      if (!customerName) return;

      this.customerBillCount[customerName] =
        (this.customerBillCount[customerName] || 0) + 1;
    });

    // Convert object to array
    const customerArray = Object.entries(this.customerBillCount).map(
      ([customer, count]) => ({
        customer,
        count
      })
    );

    // Sort descending
    customerArray.sort((a, b) => b.count - a.count);

    // Top 5 customers
    const top5 = customerArray.slice(0, 5);

    // Update chart
    this.chartOptions.series = [
      {
        name: 'Bills',
        data: top5.map(x => x.count)
      }
    ];

    this.chartOptions.xaxis = {
      categories: top5.map(x => x.customer)
    };

    // console.log(top5);
  }

  getBillCount(customer: string): number {
    return this.customerBillCount[customer] || 0;
  }
}