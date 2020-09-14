import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListDialogComponent } from './transaction-list-dialog.component';
import { FormsModule } from '@angular/forms';
import { ColorModule } from '../../../../../../shared/color/color.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    ColorModule,
    

    FlexLayoutModule
  ],
  declarations: [TransactionListDialogComponent],
  exports: [TransactionListDialogComponent],
  entryComponents: [TransactionListDialogComponent]
})
export class TransactionListDialogModule { }
