import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MaterialModule} from "../core/models/material/material.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule, MatInputModule, MaterialModule, MatFormFieldModule, FormsModule, MatDatepickerModule,MatNativeDateModule],
  exports:[AdminComponent, MaterialModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule]
})
export class AdminModule {}
