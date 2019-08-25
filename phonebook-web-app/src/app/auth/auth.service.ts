import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthState, User } from './store/state';
import { Store } from '@ngrx/store';
import { isAuthSelector, userSelector } from './store/selectors';
import { AuthAPIService } from './api.service';
import { Token, TokenService } from './token.service';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SetUser } from './store/actions';

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

    checkAuthentication(): Observable<boolean> {
        return this.store.select(isAuthSelector).pipe(
            mergeMap(isAuth => {
                if (isAuth) {
                    return of(true);
                }
                return this.api.getLoggedInUser().pipe(
                    map(user => {
                        this.store.dispatch(new SetUser(user));
                        return !!user;
                    }),
                    catchError(() => {
                        return of(false);
                    })
                );
            })
        );
    }

}
