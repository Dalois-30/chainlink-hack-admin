import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { CreatePostComponent } from './create-post/create-post.component';
import { ListPostComponent } from './list-post/list-post.component';
import { DetailPostComponent } from './detail-post/detail-post.component';
import { PostsComponent } from './posts.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../shared/shared.module';
// ngx-quill
import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [
    CreatePostComponent,
    ListPostComponent,
    DetailPostComponent,
    PostsComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    NgxDatatableModule,
    SharedModule,
    QuillModule.forRoot(), // ngx-quill
  ]
})
export class PostsModule { }
