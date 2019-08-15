import { ActionReducerMap } from '@ngrx/store';
import { PhoneBookState, PhoneBookFeatureName } from './phone-book/store/state';
import { phoneBookReducer } from './phone-book/store/reducer';

export interface AppState {
    [PhoneBookFeatureName]: PhoneBookState;
}

export const appReducers: ActionReducerMap<AppState> = {
    [PhoneBookFeatureName]: phoneBookReducer
};

