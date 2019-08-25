import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { some } from 'lodash-es';

const whiteListRoutes = ['get-user', 'isloggedin'];

const isWhiteListURL = (url) => {
    return some(whiteListRoutes, (route) => url.includes(route));
};

@Injectable()
export class AuthHTTPInterceptor implements HttpInterceptor {
    constructor(
        private readonly tokenService: TokenService,
        private readonly router: Router,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getToken();
        const newReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next.handle(newReq).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401 && !isWhiteListURL(newReq.url)) {
                        console.log(' in quth interceptor navigating ...... ', newReq.url);
                        this.router.navigate(['login']);
                    }
                }
                return throwError(error);
            })
        );
    }

}
