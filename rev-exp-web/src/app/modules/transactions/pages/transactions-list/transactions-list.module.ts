import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//components
import { TransactionsListComponent } from './transactions-list.component';

//modules
import { CalendarModule } from '../../components/calendar/calendar.module';
import { ColorModule } from '../../../../shared/color/color.module';

// material
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';

// libs
import { FlexLayoutModule } from '@angular/flex-layout';
import { TransactionFormDialogModule } from '../../dialogs/transaction-form-dialog/transaction-form-dialog.module';

@NgModule({
  imports: [
    CommonModule,

    // modules
    CalendarModule,
    ColorModule,
    TransactionFormDialogModule,

    // material
    MatToolbarModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,

    // libs
    FlexLayoutModule
  ],
  exports: [TransactionsListComponent],
  declarations: [TransactionsListComponent]
})
export class TransactionsListModule { }
