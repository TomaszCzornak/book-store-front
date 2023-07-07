import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookSingleComponent} from "./book-single/book-single.component";

const routes: Routes = [
  {path:'api/book/all', component: BookSingleComponent, pathMatch: 'full', title:'Book Item'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookSingleRoutingModule { }
