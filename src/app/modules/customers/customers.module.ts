import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomersComponent} from "./customers.component";
import {CustomerComponent} from "./components/customer/customer.component";
import {CustomersRoutingModule} from "./customers-routing.module";



@NgModule({
  declarations: [
    CustomersComponent,
    CustomerComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule
  ],
  exports:[CustomersComponent, CustomerComponent],
  bootstrap:[CustomersComponent]
})
export class CustomersModule { }
