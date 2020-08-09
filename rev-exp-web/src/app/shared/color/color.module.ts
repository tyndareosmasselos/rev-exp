import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryDirective } from '../../directives/primary.directive';
import { DarkDirective } from '../../directives/dark.directive';
import { ErrorDirective } from '../../directives/error.directive';
import { LightDirective } from '../../directives/light.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PrimaryDirective, DarkDirective, ErrorDirective, LightDirective],
  exports: [PrimaryDirective, DarkDirective, ErrorDirective, LightDirective]
})
export class ColorModule { }
