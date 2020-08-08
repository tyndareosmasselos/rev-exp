import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { CategoryListDataResolver } from './pages/category-list/category-list.resolver';

const routes: Routes = [
  {
    path: "",
    component: CategoryListComponent,
    resolve: {
      pageData: CategoryListDataResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
