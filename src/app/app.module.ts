import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



import {HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {CoreModule} from "./modules/core/core.module";
import {BookListRoutingModule} from "./modules/book-list/book-list-routing.module";
import {BookListModule} from "./modules/book-list/book-list.module";
import {CustomersRoutingModule} from "./modules/customers/customers-routing.module";
import {MaterialModule} from "./modules/core/models/material/material.module";
import {HomeRoutingModule} from "./modules/home/home-routing.module";

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HomeRoutingModule,
    BookListRoutingModule,
    BookListModule,
    HttpClientModule,
    MatCardModule,
    CoreModule,
    CustomersRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
