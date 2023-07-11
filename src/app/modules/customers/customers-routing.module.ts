import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerComponent} from "./components/customer/customer.component";
import {CustomersComponent} from "./customers.component";

const routes: Routes = [
  {path: '', component: CustomersComponent},
  {path: 'a', component: CustomerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
