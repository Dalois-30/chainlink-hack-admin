import { createAction, props } from '@ngrx/store';
import { UserGetDTO } from '../models/user-get-many.dto';

export const loadUserSuccess = createAction(
    '[User] Load User Success', 
    props<{ 
        id: string
        user: UserGetDTO 
    }>());
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ users: UserGetDTO[] }>());
export const loadUserFailure = createAction('[User] Load User Failure', props<{ error: any }>());