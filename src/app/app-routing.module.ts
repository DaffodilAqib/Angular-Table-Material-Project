import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonFetchTableComponent } from './json-fetch-table/json-fetch-table.component';
import { LoginComponent } from './login/login.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SimpletableComponent } from './simpletable/simpletable.component';

const routes: Routes = [
  {path:"side-nav/simpletable",component:SimpletableComponent},
  {path:"login", component:LoginComponent},
  {path:"",redirectTo:'login', pathMatch:"full"},
  {path:"side-nav/jsonfetchtable",component:JsonFetchTableComponent},
  {path:"side-nav", component:SideNavComponent, children:[{path:"simpletable",component:SimpletableComponent,outlet: "left"}]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
