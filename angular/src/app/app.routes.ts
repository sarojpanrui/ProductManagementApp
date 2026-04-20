import { Routes } from '@angular/router';
import { ProductComponent } from './Pages/product/product.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { BillComponent } from './Pages/bill/bill.component';
import { GenerateBillComponent } from './Pages/generate-bill/generate-bill.component';
import { ViewBillComponent } from './Pages/view-bill/view-bill.component';

export const appRoutes: Routes = [
 {
    path:'',
    component:DashboardComponent
  },
  {
    path:'product',
    component:ProductComponent
  },
  {
    path:'bill',
    component:BillComponent
  },
  {
    path:'generateBill',
    component:GenerateBillComponent
  },
  {
    path:'viewbill/:id',
    component:ViewBillComponent
  }
  
];
