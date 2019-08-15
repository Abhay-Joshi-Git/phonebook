import { PhoneBookState, PhoneBookInitialState } from './state';
import { PhoneBookAction, PhoneBookActionType } from './actions';

export function phoneBookReducer(state: PhoneBookState = PhoneBookInitialState, action: PhoneBookAction): PhoneBookState {
    switch (action.type) {
        case PhoneBookActionType.ADD_RECORD:
            return [
                ...state,
                action.payload
            ];

        case PhoneBookActionType.DELETE_RECORD:
            return state.filter((item) => item.name !== action.payload);

        case PhoneBookActionType.EDIT_RECORD:
            const index = state.findIndex((item) => item.name === action.payload.name);
            return [
                ...state.slice(0, index),
                action.payload,
                ...state.slice(index + 1, state.length)
            ];

        case PhoneBookActionType.SET_RECORDS:
            return [
                ...action.payload
            ];

        default:
            return state;
    }
}
