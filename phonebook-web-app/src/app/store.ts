import { ActionReducerMap } from '@ngrx/store';
import { PhoneBookState, PhoneBookFeatureName } from './phone-book/store/state';
import { phoneBookReducer } from './phone-book/store/reducer';
import { InProgressStateFeatureName, InProgressState, inProgressReducer } from './progress-indicator/store/in-progress.state';

export interface AppState {
    [PhoneBookFeatureName]: PhoneBookState;
    [InProgressStateFeatureName]: InProgressState;
}

export const appReducers: ActionReducerMap<AppState> = {
    [PhoneBookFeatureName]: phoneBookReducer,
    [InProgressStateFeatureName]: inProgressReducer
};

