import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BookListRoutingModule} from './book-list-routing.module';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {BookListComponent} from "./book-list.component";
import {BookModule} from "../book/book.module";
import {CdkFixedSizeVirtualScroll} from "@angular/cdk/scrolling";
import {SlickCarouselModule} from "ngx-slick-carousel";



@NgModule({
  declarations: [BookListComponent
  ],
  imports: [
    CommonModule,
    BookListRoutingModule,
    MatCardModule,
    MatButtonModule,
    BookModule,
    CdkFixedSizeVirtualScroll,
    SlickCarouselModule

  ],
  exports: [BookListComponent],
  bootstrap:[BookListComponent]
})
export class BookListModule {
}
