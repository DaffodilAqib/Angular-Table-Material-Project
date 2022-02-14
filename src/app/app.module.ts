import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SideNavComponent } from './side-nav/side-nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';

import { MatNativeDateModule } from '@angular/material/core';
import {MaterialExampleModule} from '../material.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AuthGuardGuard } from './auth-guard.guard';
import { SignUpComponent } from './sign-up/sign-up.component';

import { AuthInterceptor } from './auth.Interceptor';
import { SideNavModule } from './side-nav/side-nav.module';




@NgModule({
  declarations: [
    AppComponent,
    // SimpletableComponent,
    // JsonFetchTableComponent,
    SideNavComponent,
    LoginComponent,
    SignUpComponent,
    // OrdersComponent,
    // EmployeeDetailsComponent,
    // OrderFormComponent,
    // UpdateDailogComponent,
    // DeleteDailogComponent,
    // DashboardComponent,
    // NotPageFoundComponent,
    // HomePageComponent
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
    SideNavModule,
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
