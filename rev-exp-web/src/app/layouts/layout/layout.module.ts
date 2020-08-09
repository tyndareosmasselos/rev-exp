import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layout-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// components
import { LayoutComponent } from './layout.component';

// @material
import {MatSidenavModule} from '@angular/material/sidenav';

// modules
import { SideBarModule } from '../side-bar/side-bar.module';


@NgModule({
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LayoutsRoutingModule,

    // modules
    SideBarModule,

    // @material
    MatSidenavModule
  ]
})
export class LayoutModule { }
