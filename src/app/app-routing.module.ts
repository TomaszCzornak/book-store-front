import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch: 'full', title:'Home Page'},
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {path:'books', loadChildren: ()=>import('./modules/book-list/book-list.module').then((m)=>m.BookListModule)},
  { path: 'customers', loadChildren: () => import('src/app/modules/customers/customers.module').then(m => m.CustomersModule) },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
