import { Component } from '@angular/core';
import { InternetConnectionStatusComponent, LoaderBarComponent } from '@abp/ng.theme.shared';
import { DynamicLayoutComponent } from '@abp/ng.core';
import { inject } from '@angular/core';
import { RoutesService, eLayoutType } from '@abp/ng.core';

@Component({
  selector: 'app-root',
  template: `
    <abp-loader-bar />
    <abp-dynamic-layout />
    <abp-internet-status />
  `,
  imports: [LoaderBarComponent, DynamicLayoutComponent, InternetConnectionStatusComponent],
})
export class AppComponent {
  private routes = inject(RoutesService);

  constructor() {
    //  remove default menu items first
    this.routes.remove(['::Home']);

    //  add custom sidebar menu
    this.routes.add([
      {
        path: '',
        name: 'Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/product',
        name: 'Products',
        iconClass: 'fas fa-box',
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: '/bill',
        name: 'Bills',
        iconClass: 'fas fa-file-invoice',
        order: 3,
        layout: eLayoutType.application,
      },
      {
        path: '/generateBill',
        name: 'GenerateBill',
        iconClass: 'fas fa-file-invoice-dollar',
        order: 3,
        layout: eLayoutType.application,
      },
      {
        path:'/user',
        name:'MyCustomers',
        iconClass: 'fas fa-user-cog',
        order: 3,
        layout: eLayoutType.application,
      }
      
    ]);
  }
}
