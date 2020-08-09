import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { InputSelectComponent } from './input-select.component';

// @material
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // @material
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,

    // libs
    FlexLayoutModule
  ],
  exports: [InputSelectComponent],
  declarations: [InputSelectComponent]
})
export class InputSelectModule { }
