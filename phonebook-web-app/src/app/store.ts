import { ActionReducerMap } from '@ngrx/store';
import { PhoneBookState, PhoneBookFeatureName } from './phone-book/store/state';
import { phoneBookReducer } from './phone-book/store/reducer';
import { InProgressStateFeatureName, InProgressState, inProgressReducer } from './progress-indicator/store/in-progress.state';
import { AuthStateFeatureName, AuthState } from './auth/store/state';

export interface RootState {
    [PhoneBookFeatureName]: PhoneBookState;
    [InProgressStateFeatureName]: InProgressState;
}

export const appReducers: ActionReducerMap<RootState> = {
    [PhoneBookFeatureName]: phoneBookReducer,
    [InProgressStateFeatureName]: inProgressReducer
};

export interface AppState extends RootState {
    [AuthStateFeatureName]: AuthState;
}

