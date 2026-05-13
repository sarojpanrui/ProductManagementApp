import { Component, OnInit, inject } from '@angular/core';
import { BillDto } from '@proxy/dtos/bill';
import { BillService } from '@proxy/services/bill-services';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexPlotOptions,
  NgApexchartsModule,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  title?: ApexTitleSubtitle;
  dataLabels?: ApexDataLabels;
  plotOptions?: ApexPlotOptions;
  colors?: string[];
};

@Component({
  selector: 'app-topselling-product',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './topselling-product.component.html',
  styleUrl: './topselling-product.component.scss',
})
export class TopsellingProductComponent implements OnInit {

  billServise = inject(BillService);

  bills: BillDto[] = [];

  public chartOptions: Partial<ChartOptions> = {
    series: [
      {
        name: 'Sold Quantity',
        data: []
      }
    ],

    chart: {
      type: 'bar',
      height: 450
    },

    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 2
      }
    },

    dataLabels: {
      enabled: true
    },

    xaxis: {
      categories: []
    },

    title: {
      text: 'Top 5 Selling Products'
    }
  };

  ngOnInit(): void {
    this.fetchBills();
  }

  fetchBills() {
    this.billServise.getList({
      skipCount: 0,
      maxResultCount: 100
    }).subscribe((res) => {
      this.bills = res.items ?? [];
      // console.log(this.bills);
      this.calculateTopSellingProducts();
    });
  }

  calculateTopSellingProducts() {

    const productCount: { [key: string]: number } = {};

    this.bills.forEach((bill) => {

      if (!bill.buyProducts) return;

      try {

        // parse JSON string
        const products = JSON.parse(bill.buyProducts);

        products.forEach((product: any) => {

          const productName = product.name;

          if (!productName) return;

          productCount[productName] =
            (productCount[productName] || 0) + 1;
        });

      } catch (error) {

        console.error('Invalid tibuyProducts JSON', error);
      }
    });

    // convert object to array
    const productArray = Object.entries(productCount).map(
      ([name, count]) => ({
        name,
        count
      })
    );

    // sort descending
    productArray.sort((a, b) => b.count - a.count);

    // top 5
    const topProducts = productArray.slice(0, 5);

    // update chart
    this.chartOptions.series = [
      {
        name: 'Sold Quantity',
        data: topProducts.map(x => x.count)
      }
    ];

    this.chartOptions.xaxis = {
      categories: topProducts.map(x => x.name)
    };

    console.log(topProducts);
  }
}