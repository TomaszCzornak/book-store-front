import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {path:'', redirectTo: 'api/admin/add', pathMatch: 'full', title:'Home Page'},
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {path:'api/book/all',
    loadChildren: ()=>import('./modules/book-list/book-list.module').then((m)=>m.BookListModule)},
  { path: 'customers', loadChildren: () => import('src/app/modules/customers/customers.module').then(m => m.CustomersModule) },

  {path:'api/admin/add',
  loadChildren:()=>import('./modules/admin/admin.module').then((m)=>m.AdminModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
