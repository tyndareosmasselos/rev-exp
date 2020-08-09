import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { InputTextComponent } from './input-text.component';

// @material
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // @material
    MatInputModule,
    MatFormFieldModule
  ],
  declarations: [InputTextComponent],
  exports: [InputTextComponent]
})
export class InputTextModule { }
