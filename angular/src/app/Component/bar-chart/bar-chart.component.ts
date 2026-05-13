import { Component, inject, OnInit } from '@angular/core';
import { CustomerDto } from '@proxy/dtos/customer';
import { CustomerServicesService } from '@proxy/services/customer-services';

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
  selector: 'app-bar-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {

  customers: CustomerDto[] = [];

  topCustomers: {
    name: string;
    totalAmount: number;
  }[] = [];

  customerService = inject(CustomerServicesService);

  public chartOptions: Partial<ChartOptions> = {
    series: [
      {
        name: 'Total Amount',
        data: []
      }
    ],

    chart: {
      type: 'bar',
      height: 450
    },

    plotOptions: {
      bar: {
        borderRadius: 4,
       
        
      }
    },

    dataLabels: {
      enabled: false
    },

    xaxis: {
      categories: []
    },

    title: {
      text: 'Top 5 Customers'
    }
  };

  ngOnInit(): void {
    this.fetchCustomer();
  }

  fetchCustomer(): void {
    this.customerService.getList({
      skipCount: 0,
      maxResultCount: 100
    }).subscribe((res) => {
      this.customers = res.items ?? [];
      this.topCustomers = [...this.customers]
        .sort((a, b) => (b.totalAmount ?? 0) - (a.totalAmount ?? 0))
        .slice(0, 5)
        .map(customer => ({
          name: customer.name ?? '',
          totalAmount: customer.totalAmount ?? 0
        }));


      this.chartOptions = {
        ...this.chartOptions,
        series: [
          {
            name: 'Total Amount',
            data: this.topCustomers.map(c => c.totalAmount)
          }
        ],

        xaxis: {
          categories: this.topCustomers.map(c => c.name)
        }
      };
      // console.log(this.topCustomers);
    });
  }
}