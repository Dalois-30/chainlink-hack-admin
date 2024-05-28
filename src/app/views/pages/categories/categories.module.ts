import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { DetailCategoryComponent } from './detail-category/detail-category.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    CategoriesComponent,
    CreateCategoryComponent,
    ListCategoryComponent,
    DetailCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    NgxDatatableModule,
    SharedModule
  ]
})
export class CategoriesModule { }
