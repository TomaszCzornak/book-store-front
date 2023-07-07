import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { BookSingleRoutingModule } from './book-single-routing.module';
import { BookSingleComponent } from './book-single/book-single.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    BookSingleComponent
  ],
  imports: [
    CommonModule,
    BookSingleRoutingModule,
    MatButtonModule,
    MatCardModule,
    NgOptimizedImage
  ]
})
export class BookSingleModule { }
