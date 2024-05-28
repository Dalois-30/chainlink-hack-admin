import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { DetailCommentComponent } from './detail-comment/detail-comment.component';
import { ListCommentComponent } from './list-comment/list-comment.component';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { CommentsComponent } from './comments.component';


@NgModule({
  declarations: [
    DetailCommentComponent,
    ListCommentComponent,
    CreateCommentComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    CommentsRoutingModule
  ]
})
export class CommentsModule { }
