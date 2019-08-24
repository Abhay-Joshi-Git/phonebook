import { Action } from '@ngrx/store';
import { User } from './state';

export enum AuthActionType {
    SET_USER = '[auth] SET_USER'
}

export class SetUser implements Action {
    type = AuthActionType.SET_USER;

    constructor(public payload: User) {}
}

export type AuthAction = SetUser;
