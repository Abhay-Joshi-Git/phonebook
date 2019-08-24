const tokenKey = 'auth_token';

export interface Token {
    token: string;
}

export class TokenService {
    setToken(tokenData: Token) {
        localStorage.setItem(tokenKey, tokenData.token);
    }

    getToken() {
        return localStorage.getItem(tokenKey);
    }

    deleteToken() {
        localStorage.removeItem(tokenKey);
    }
}
