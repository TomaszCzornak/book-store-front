import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book/book.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    BookComponent
  ],
  exports: [
    BookComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class BookModule { }
