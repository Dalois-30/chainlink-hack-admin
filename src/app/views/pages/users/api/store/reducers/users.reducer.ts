import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { UserGetDTO } from '../models/user-get-many.dto';

export const userAdapter = createEntityAdapter<UserGetDTO>();
export interface UserState extends EntityState<UserGetDTO> {
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const initialState: UserState = userAdapter.getInitialState({
  loaded: false,
  loading: false,
  error: null,
});

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUserSuccess, (state, { user }) => userAdapter.upsertOne(user, { ...state, loaded: true, loading: false })),
  on(UserActions.loadUsersSuccess, (state, { users }) => userAdapter.upsertMany(users, { ...state, loaded: true, loading: false })),
  on(UserActions.loadUserFailure, (state, { error }) => ({ ...state, loaded: false, loading: false, error })),
);

export const {
  selectAll: selectAllUsers,
} = userAdapter.getSelectors();