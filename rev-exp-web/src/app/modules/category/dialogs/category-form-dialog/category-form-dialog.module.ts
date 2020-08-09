import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormDialogComponent } from './category-form-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modules
import { InputTextModule } from '../../../../components/input-text/input-text.module';
import { InputSelectModule } from '../../../../components/input-select/input-select.module';

// @material
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ColorModule } from '../../../../shared/color/color.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // modules
    InputTextModule,
    InputSelectModule,
    ColorModule,

    // @material
    MatButtonModule,
    MatToolbarModule
  ],
  exports: [CategoryFormDialogComponent],
  declarations: [CategoryFormDialogComponent]
})
export class CategoryFormDialogModule { }
