import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormBuilderComponent } from '../form-builder/form-builder.component';
import { FormMakeTableComponent } from '../form-builder/form-make-table/form-make-table.component';

import { NotPageFoundComponent } from '../not-page-found/not-page-found.component';
import { OrdersComponent } from '../orders/orders.component';
import { SideNavComponent } from './side-nav.component';

const routes: Routes = [
  {
    path: "", component: SideNavComponent, children: [
      { path: "DashBoard", component: DashboardComponent, pathMatch:"full" },
      { path: "orders", component: OrdersComponent, pathMatch:"full" },
      {path:"FormBuilder", component:FormMakeTableComponent, pathMatch:"full"},
      {path:"form-maker", component:FormBuilderComponent,pathMatch:"full"},
      { path: "**", component: NotPageFoundComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SideNavRoutingModule { }
