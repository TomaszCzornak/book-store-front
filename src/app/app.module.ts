import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {CoreModule} from "./modules/core/core.module";
import {BookListRoutingModule} from "./modules/book-list/book-list-routing.module";
import {BookListModule} from "./modules/book-list/book-list.module";
import {CustomersRoutingModule} from "./modules/customers/customers-routing.module";
import {MaterialModule} from "./modules/core/models/material/material.module";
import {HomeRoutingModule} from "./modules/home/home-routing.module";
import {AdminModule} from "./modules/admin/admin.module";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DATE_FORMATS, MatDateFormats, MatNativeDateModule} from "@angular/material/core";
import {BearerInterceptorInterceptor} from "./modules/core/interceptors/bearer-interceptor.interceptor";

export const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    MatFormFieldModule,
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
    CustomersRoutingModule,
    AdminModule,
    AdminModule,
    MatNativeDateModule,

  ],
  providers: [{provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
    {provide: HTTP_INTERCEPTORS, useClass: BearerInterceptorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
