import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Token } from './token.service';
import { User } from './store/state';
import { catchError, map } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Injectable()
export class AuthAPIService {
    constructor(private httpClient: HttpClient) {}

    logIn(userName: string, password: string) {
        return this.httpClient.post<Token>('/api/login', {
            userName,
            password
        });
    }

    logout() {
        return this.httpClient.post('/api/logout', null);
    }

    getLoggedInUser() {
        return this.httpClient.get<User>('/api/get-user');
    }
}
