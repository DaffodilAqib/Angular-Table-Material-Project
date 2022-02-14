import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideNavRoutingModule } from './side-nav-routing.module';
import { SideNavComponent } from './side-nav.component';
import { OrdersComponent } from '../orders/orders.component';
import { OrderFormComponent } from '../orders/order-form/order-form.component';
import { SimpletableComponent } from '../simpletable/simpletable.component';
import { JsonFetchTableComponent } from '../json-fetch-table/json-fetch-table.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialExampleModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateDailogComponent } from '../orders/Update-Delete-Component/update-dailog/update-dailog.component';
import { DeleteDailogComponent } from '../orders/Update-Delete-Component/delete-dailog/delete-dailog.component';
import { NotPageFoundComponent } from '../not-page-found/not-page-found.component';


@NgModule({
  declarations: [
    SimpletableComponent,
    JsonFetchTableComponent,
    OrdersComponent,
    OrderFormComponent,
    DashboardComponent,
    UpdateDailogComponent,
    DeleteDailogComponent,
    NotPageFoundComponent
  ],
  imports: [
    CommonModule,
    SideNavRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MaterialExampleModule,
  ]
})
export class SideNavModule { }
