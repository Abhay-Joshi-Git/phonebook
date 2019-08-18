import { Action, createFeatureSelector, createSelector } from '@ngrx/store';

export const InProgressStateFeatureName = 'isInProgress';
export type InProgressState = boolean;

export const InProgressInitialState = false;

const setInProgressType = 'SET_IN_Progress';
export class SetInProgress implements Action {
    type = setInProgressType;

    constructor(public payload: boolean) {}
}

export type InProgressAction = SetInProgress;

export function inProgressReducer(state: InProgressState = InProgressInitialState, action: InProgressAction) {
    switch (action.type) {
        case setInProgressType:
            return action.payload;
        default:
            return state;
    }
}

export const inProgressSelector = createFeatureSelector<InProgressState>(InProgressStateFeatureName);
