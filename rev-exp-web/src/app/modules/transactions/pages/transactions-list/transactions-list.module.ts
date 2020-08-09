import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//components
import { TransactionsListComponent } from './transactions-list.component';

//modules
import { CalendarModule } from '../../components/calendar/calendar.module';

@NgModule({
  imports: [
    CommonModule,

    //modules
    CalendarModule
  ],
  exports: [TransactionsListComponent],
  declarations: [TransactionsListComponent]
})
export class TransactionsListModule { }
