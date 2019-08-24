import { AuthState, InitialAuthState } from './state';
import { AuthAction, AuthActionType } from './actions';

export function authReducer(state: AuthState = InitialAuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case AuthActionType.SET_USER:
            return {
                ...state,
                loggedInUser: action.payload
            };
            break;
        default:
            return state;
    }
}
