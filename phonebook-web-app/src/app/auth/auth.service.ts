import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthState, User } from './store/state';
import { Store } from '@ngrx/store';
import { isAuthSelector, userSelector } from './store/selectors';
import { AuthAPIService } from './api.service';
import { Token, TokenService } from './token.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    constructor(
        private store: Store<AuthState>,
        private api: AuthAPIService,
        private tokenService: TokenService,
        private router: Router,
    ) {}

    isAuthenticated(): Observable<boolean> {
        return this.store.select(isAuthSelector);
    }

    getLoggedInUser(): Observable<User> {
        return this.store.select(userSelector);
    }

    logIn(userName: string, password: string) {
        return this.api.logIn(userName, password).pipe(
            tap((token: Token) => {
                this.tokenService.setToken(token);
                this.router.navigate(['/']);
            })
        );
    }

    logout() {
        return this.api.logout().pipe(
            tap(() => {
                this.tokenService.deleteToken();
            })
        );
    }

}
