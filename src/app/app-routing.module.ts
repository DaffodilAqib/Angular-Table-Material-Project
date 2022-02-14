import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';
import { JsonFetchTableComponent } from './json-fetch-table/json-fetch-table.component';
import { LoginComponent } from './login/login.component';
import { NotPageFoundComponent } from './not-page-found/not-page-found.component';
import { OrdersComponent } from './orders/orders.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SimpletableComponent } from './simpletable/simpletable.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"",redirectTo:'login', pathMatch:"full"},
  {path:"sign-up",component:SignUpComponent},
  {path:"home",component:SideNavComponent,canActivate:[AuthGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
