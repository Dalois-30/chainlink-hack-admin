import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './components/list-user/list-user.component';
import { DetailUserComponent } from './components/detail-user/detail-user.component';
import { UsersComponent } from './users.component';
import { userResolver } from './resolver/user.resolver';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AppGuard } from '../../shared/guard/app.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [AppGuard],
    data: { requiredRoles: ["Admin"] }, 
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ListUserComponent
      },
      {
        path: 'create',
        component: CreateUserComponent
      },
      {
        path: 'detail/:id',
        component: DetailUserComponent,
        resolve: {user: userResolver}
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
