import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionFormDialogComponent } from './transaction-form-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modules
import { InputTextModule } from '../../../../components/input-text/input-text.module';
import { InputSelectModule } from '../../../../components/input-select/input-select.module';

// @material
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ColorModule } from '../../../../shared/color/color.module';
import { InputDateModule } from '../../../../components/input-date/input-date.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // modules
    InputTextModule,
    InputSelectModule,
    InputDateModule,
    ColorModule,

    // @material
    MatButtonModule,
    MatToolbarModule
  ],
  exports: [TransactionFormDialogComponent],
  declarations: [TransactionFormDialogComponent]
})
export class TransactionFormDialogModule { }
