import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [
    ProductsComponent,
    CreateProductComponent,
    DetailProductComponent,
    ListProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgxDatatableModule,
    SharedModule

  ]
})
export class ProductsModule { }
