import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookComponent} from "./book/book.component";

const routes: Routes = [
  {path:'api/book/id', component: BookComponent, pathMatch: 'full', title:'Book Item'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
