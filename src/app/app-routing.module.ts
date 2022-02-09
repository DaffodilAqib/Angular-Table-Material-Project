import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';
import { JsonFetchTableComponent } from './json-fetch-table/json-fetch-table.component';
import { LoginComponent } from './login/login.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SimpletableComponent } from './simpletable/simpletable.component';

const routes: Routes = [
  {path:"side-nav/simpletable",component:SimpletableComponent},
  {path:"login", component:LoginComponent},
  {path:"side-nav",component:SideNavComponent,canActivate:[AuthGuardGuard]},
  {path:"",redirectTo:'login', pathMatch:"full"},
  {path:"sign-up",component:SignUpComponent},
  {path:"side-nav/jsonfetchtable",component:JsonFetchTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
