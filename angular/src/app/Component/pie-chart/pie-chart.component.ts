import { Component, inject, OnInit } from '@angular/core';

import { BillDto } from '@proxy/dtos/bill';
import { CustomerDto } from '@proxy/dtos/customer';
import { ProductDto } from '@proxy/dtos/product';

import { BillService } from '@proxy/services/bill-services';
import { CustomerServicesService } from '@proxy/services/customer-services';
import { ProductServicesService } from '@proxy/services/product-services';

import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive,
  ApexLegend,
  ApexDataLabels,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexPlotOptions,
  NgApexchartsModule,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  tooltip: ApexTooltip;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnInit {

  billService = inject(BillService);

  customerServices = inject(CustomerServicesService);

  productServives = inject(ProductServicesService);

  bills: BillDto[] = [];
  customers: CustomerDto[] = [];
  products: ProductDto[] = [];

  bill_count = 0;
  customer_count = 0;
  product_count = 0;

  chartOptions: Partial<ChartOptions> = {
    series: [],

    chart: {
      type: 'donut',
      height: 400,
    },

    labels: [],

    title: {
      text: 'System Records Overview',
      align: 'center',
    },

    dataLabels: {
      enabled: true,
    },

    legend: {
      position: 'bottom',
    },

    tooltip: {
      enabled: true,
    },

    plotOptions: {
      pie: {
        donut: {
          size: '65%',
        },
      },
    },

    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  ngOnInit(): void {

    this.fetchBills();

    this.fetchCustomer();

    this.fetchProducts();
  }

  fetchBills() {
    this.billService.getList({
      skipCount: 0,
      maxResultCount: 100
    }).subscribe((res) => {
      this.bills = res.items ?? [];
      this.bill_count = res.totalCount ?? 0;
      this.updateChart();
    });
  }

  fetchCustomer() {
    this.customerServices.getList({
      skipCount: 0,
      maxResultCount: 100
    }).subscribe((res) => {
      this.customers = res.items ?? [];
      this.customer_count = res.totalCount ?? 0;
      this.updateChart();
    });
  }

  fetchProducts() {
    this.productServives.getProducts({
      skipCount: 0,
      maxResultCount: 100
    }).subscribe((res) => {
      this.products = res.items ?? [];
      this.product_count = res.totalCount ?? 0;
      this.updateChart();
    });
  }

  updateChart() {
    this.chartOptions.series = [
      this.bill_count,
      this.customer_count,
      this.product_count
    ];

    this.chartOptions.labels = [
      'Bills',
      'Customers',
      'Products'
    ];
  }
}