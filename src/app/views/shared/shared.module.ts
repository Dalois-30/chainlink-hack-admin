import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule, // Ng-select
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule, // Ng-select
  ]
})
export class SharedModule { }
