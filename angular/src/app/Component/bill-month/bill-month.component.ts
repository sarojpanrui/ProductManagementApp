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
  selector: 'app-bill-month',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './bill-month.component.html',
  styleUrl: './bill-month.component.scss',
})
export class BillMonthComponent implements OnInit {

  bills: BillDto[] = [];

  billServices = inject(BillService);

  public chartOptions: Partial<ChartOptions> = {

    series: [
      {
        name: 'Bills',
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
      text: 'Bills Generated Per Month',
      align: 'center'
    }
  };

  ngOnInit(): void {
    this.fetchBills();
  }

  fetchBills() {

    this.billServices.getList({
      skipCount: 0,
      maxResultCount: 100
    }).subscribe((res) => {

      this.bills = res.items ?? [];

      console.log(this.bills);

      this.calculateMonthlyBills();
    });
  }

  calculateMonthlyBills() {

    // Jan to Dec
    const monthlyBills = Array(12).fill(0);

    this.bills.forEach((bill) => {

      if (!bill.creationTime) return;

      const date = new Date(bill.creationTime);

      const monthIndex = date.getMonth();

      monthlyBills[monthIndex]++;
    });

    console.log(monthlyBills);

    this.chartOptions.series = [
      {
        name: 'Bills',
        data: monthlyBills
      }
    ];

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