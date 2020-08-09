import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';

//modules
import { TransactionsListModule } from './pages/transactions-list/transactions-list.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TransactionsRoutingModule,

    //modules
    TransactionsListModule
  ]
})
export class TransactionsModule { }
