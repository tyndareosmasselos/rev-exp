import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListModule } from './pages/category-list/category-list.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CategoryRoutingModule,

    CategoryListModule
  ]
})
export class CategoryModule { }
