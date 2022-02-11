import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpletableComponent } from './simpletable/simpletable.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JsonFetchTableComponent } from './json-fetch-table/json-fetch-table.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';

import { MatNativeDateModule } from '@angular/material/core';
import {MaterialExampleModule} from '../material.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AuthGuardGuard } from './auth-guard.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OrdersComponent } from './orders/orders.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { OrderFormComponent } from './orders/order-form/order-form.component';
import { AuthInterceptor } from './auth.Interceptor';
import { UpdateDailogComponent } from './orders/Update-Delete-Component/update-dailog/update-dailog.component';
import { DeleteDailogComponent } from './orders/Update-Delete-Component/delete-dailog/delete-dailog.component';


@NgModule({
  declarations: [
    AppComponent,
    SimpletableComponent,
    JsonFetchTableComponent,
    SideNavComponent,
    LoginComponent,
    SignUpComponent,
    OrdersComponent,
    EmployeeDetailsComponent,
    OrderFormComponent,
    UpdateDailogComponent,
    DeleteDailogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MaterialExampleModule,
  ],
  exports: [
    MatSidenavModule
  ],
  providers: [AuthGuardGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
