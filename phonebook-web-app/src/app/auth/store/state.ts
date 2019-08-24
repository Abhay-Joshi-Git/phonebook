export interface User {
    name: string;
}

export const AuthStateFeatureName = 'auth';

export interface AuthState {
    loggedInUser: User | null;
}

export const InitialAuthState: AuthState = {
    loggedInUser: null
};
