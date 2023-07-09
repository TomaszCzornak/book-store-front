import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookListComponent} from "./book-list.component";

const routes: Routes = [
  {path:'api/book/all', component: BookListComponent, pathMatch: 'full', title:'Wybierz książkę'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookListRoutingModule { }
