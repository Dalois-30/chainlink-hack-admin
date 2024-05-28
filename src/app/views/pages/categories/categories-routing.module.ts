import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { DetailCategoryComponent } from './detail-category/detail-category.component';
import { categoriesResolver, categoryResolver } from './resolver/category.resolver';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ListCategoryComponent
      },
      {
        path: 'create',
        component: CreateCategoryComponent,
        resolve: {
          categories: categoriesResolver
        }
      },
      {
        path: 'detail/:id',
        component: DetailCategoryComponent,
        resolve: {
          category: categoryResolver,
          categories: categoriesResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
