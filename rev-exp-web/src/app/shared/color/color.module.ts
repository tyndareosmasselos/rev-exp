import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryDirective } from '../../directives/primary.directive';
import { DarkDirective } from '../../directives/dark.directive';
import { ErrorDirective } from '../../directives/error.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PrimaryDirective, DarkDirective, ErrorDirective],
  exports: [PrimaryDirective, DarkDirective, ErrorDirective]
})
export class ColorModule { }
