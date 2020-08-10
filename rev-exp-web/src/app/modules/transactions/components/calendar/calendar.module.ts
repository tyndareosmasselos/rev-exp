import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// components
import { CalendarComponent } from './calendar.component';

// libs
import { FlexLayoutModule } from '@angular/flex-layout';

// @material
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatButtonModule,
    MatIconModule,
    MatCardModule,

    // libs
    FlexLayoutModule
  ],
  exports: [CalendarComponent],
  declarations: [CalendarComponent]
})
export class CalendarModule { }
