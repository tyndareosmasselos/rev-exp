import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// components
import { CategoryListComponent } from './category-list.component';

// modules
import { ColorModule } from '../../../../shared/color/color.module';
import { CategoryFormDialogModule } from '../../dialogs/category-form-dialog/category-form-dialog.module';

// services
import { NgxSpinnerService } from "ngx-spinner";

// @material
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';

// libs
import { NgxSpinnerModule } from "ngx-spinner";
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    // modules
    ColorModule,
    CategoryFormDialogModule,

    // @material
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,

    // libs
    FlexLayoutModule,
    NgxSpinnerModule
  ],
  providers: [
    NgxSpinnerService
  ],
  exports: [CategoryListComponent],
  declarations: [CategoryListComponent]
})
export class CategoryListModule { }
