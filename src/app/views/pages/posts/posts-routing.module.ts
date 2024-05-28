import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPostComponent } from './list-post/list-post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { DetailPostComponent } from './detail-post/detail-post.component';
import { PostsComponent } from './posts.component';
import { postResolver, postsResolver } from './resolver/post.resolver';
import { categoriesResolver } from '../categories/resolver/category.resolver';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ListPostComponent
      },
      {
        path: 'create',
        component: CreatePostComponent,
        resolve: {
          categories: categoriesResolver
        }
      },
      {
        path: 'detail/:id',
        component: DetailPostComponent,
        resolve: {
          post: postResolver,
          // posts: postsResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
