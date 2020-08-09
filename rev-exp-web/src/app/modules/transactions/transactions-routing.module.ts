import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionsListComponent } from './pages/transactions-list/transactions-list.component';

const routes: Routes = [
  {
    path: "",
    component: TransactionsListComponent,
    // resolve: {
    //   pageData: CategoryListDataResolver
    // }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
