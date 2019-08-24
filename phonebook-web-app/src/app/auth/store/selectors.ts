import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthStateFeatureName, AuthState } from './state';

export const authStateSelector = createFeatureSelector(AuthStateFeatureName);

export const isAuthSelector = createSelector(authStateSelector, (state: AuthState) => {
    return !!state.loggedInUser;
});

export const userSelector = createSelector(authStateSelector, (state: AuthState) => {
    return state.loggedInUser;
});
