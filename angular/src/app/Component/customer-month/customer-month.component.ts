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
  ApexPlotOptions,
  NgApexchartsModule,
} from 'ng-apexcharts';

export type ChartOptions = {
  series?: ApexAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis;
  title?: ApexTitleSubtitle;
  dataLabels?: ApexDataLabels;
  plotOptions?: ApexPlotOptions;
  colors?: string[];
};

@Component({
  selector: 'app-customer-month',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './customer-month.component.html',
  styleUrl: './customer-month.component.scss',
})
export class CustomerMonthComponent implements OnInit {

  customers: CustomerDto[] = [];

  customerServices = inject(CustomerServicesService);

  public chartOptions: Partial<ChartOptions> = {

    series: [
      {
        name: 'Customers',
        data: []
      }
    ],

    chart: {
      height: 350,
      type: 'bar',
    },

    plotOptions: {
      bar: {
        borderRadius: 0,
        dataLabels: {
          position: 'top',
        },
      }
    },

    dataLabels: {
      enabled: true,
      offsetY: -20,
    },

    xaxis: {
      categories: [],
      position: 'top'
    },

    title: {
      text: 'Customer Added Per Month',
      align: 'center'
    }
  };

  ngOnInit(): void {
    this.fetchCustomer();
  }

  fetchCustomer() {

    this.customerServices.getList({
      skipCount: 0,
      maxResultCount: 100
    }).subscribe((res) => {

      this.customers = res.items ?? [];

      console.log(this.customers);

     
      this.calculateMonthlyCustomers();
    });
  }

  calculateMonthlyCustomers() {

    // 12 months array
    const monthlyCustomers = Array(12).fill(0);

    this.customers.forEach((customer) => {

      if (!customer.creationTime) return;

      const date = new Date(customer.creationTime);

      const monthIndex = date.getMonth();

      monthlyCustomers[monthIndex]++;
    });

    // console.log(monthlyCustomers);

    // update chart series
    this.chartOptions.series = [
      {
        name: 'Customers',
        data: monthlyCustomers
      }
    ];

    // update x-axis
    this.chartOptions.xaxis = {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    };
  }
}