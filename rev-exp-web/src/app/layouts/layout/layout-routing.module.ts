import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('../../modules/category/category.module').then(m => m.CategoryModule)
  },
  {
    path: "categories",
    loadChildren: () => import('../../modules/category/category.module').then(m => m.CategoryModule)
  },
  {
    path: "transactions",
    loadChildren: () => import('../../modules/transactions/transactions.module').then(m => m.TransactionsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
