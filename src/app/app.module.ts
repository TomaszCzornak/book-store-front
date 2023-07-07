import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./core/shared/material/material.module";
import {LayoutModule} from "./core/layout/layout.module";
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {HomeRoutingModule} from "./core/modules/home/home-routing.module";
import {BookListRoutingModule} from "./core/modules/book-list/book-list-routing.module";
import {BookListModule} from "./core/modules/book-list/book-list.module";
import {BookModule} from "./core/modules/book/book.module";
import {HttpClientModule} from "@angular/common/http";
import {BookSingleModule} from "./core/modules/book-single/book-single.module";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    HomeRoutingModule,
    BookListRoutingModule,
    BookListModule,
    BookModule,
    HttpClientModule,
    BookSingleModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
