import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//components
import { SideBarComponent } from './side-bar.component';

//@material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

//libs
import { FlexLayoutModule } from '@angular/flex-layout';

//modules
import { ColorModule } from '../../shared/color/color.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    //@material
    MatButtonModule,
    MatIconModule,

    //modules
    ColorModule,

    //libs
    FlexLayoutModule
  ],
  exports: [SideBarComponent],
  declarations: [SideBarComponent]
})
export class SideBarModule { }
