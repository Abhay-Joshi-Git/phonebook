import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Token } from './token.service';

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
}
