import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BookListRoutingModule} from './book-list-routing.module';
import {BookListComponent} from './book-list.component';

import {SlickCarouselModule} from "ngx-slick-carousel";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {RouterModule} from "@angular/router";
import {BookComponent} from "./book/book.component";


@NgModule({
  declarations: [
    BookListComponent, BookComponent
  ],
  imports: [
    CommonModule,
    BookListRoutingModule,
    SlickCarouselModule,
    MatButtonModule,
    MatCardModule,
    RouterModule
  ],
  exports: [BookListComponent, BookComponent],
  bootstrap:[BookListComponent]
})
export class BookListModule {
}
