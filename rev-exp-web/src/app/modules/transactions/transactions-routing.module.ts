import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionsListComponent } from './pages/transactions-list/transactions-list.component';
import { TransactionsListDataResolver } from './pages/transactions-list/transaction-list.resolver';

const routes: Routes = [
  {
    path: "",
    component: TransactionsListComponent,
    resolve: {
      pageData: TransactionsListDataResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
