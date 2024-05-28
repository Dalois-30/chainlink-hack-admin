import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsComponent } from './comments.component';
import { ListCommentComponent } from './list-comment/list-comment.component';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { DetailCommentComponent } from './detail-comment/detail-comment.component';

const routes: Routes = [
  {
    path: '',
    component: CommentsComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ListCommentComponent
      },
      {
        path: 'create',
        component: CreateCommentComponent
      },
      {
        path: 'detail/:id',
        component: DetailCommentComponent,
        // resolve: {user: userResolver}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsRoutingModule { }
