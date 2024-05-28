import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as UserActions from '../store/actions/user.actions';
import { UsersService } from '../service/users.service';

@Injectable()
export class UserEffects {

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserSuccess),
      mergeMap(({ id }) =>
        this.userService.getCurrentUser(id).pipe(
          map((user) => UserActions.loadUserSuccess( user )),
          catchError((error) => [UserActions.loadUserFailure({ error })])
        )
      )
    )
  );

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsersSuccess),
      mergeMap(() =>
        this.userService.getAllUsers().pipe(
          map((users) => UserActions.loadUsersSuccess({ users })),
          catchError((error) => [UserActions.loadUserFailure({ error })])
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UsersService
  ) {}
}
