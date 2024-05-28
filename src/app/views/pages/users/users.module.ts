import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Action, FeatureSlice, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UsersRoutingModule } from './users-routing.module';
import { ListUserComponent } from './components/list-user/list-user.component';
import { UsersComponent } from './users.component';
import { DetailUserComponent } from './components/detail-user/detail-user.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UserState, userReducer } from './api/store/reducers/users.reducer';
import { UserEffects } from './api/effects/user.effect';


@NgModule({
  declarations: [
    ListUserComponent,
    UsersComponent,
    CreateUserComponent,
    DetailUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NgxDatatableModule,
    StoreModule.forFeature("user",  userReducer),
    EffectsModule.forFeature([UserEffects]),
    SharedModule
  ]
})
export class UsersModule { }
