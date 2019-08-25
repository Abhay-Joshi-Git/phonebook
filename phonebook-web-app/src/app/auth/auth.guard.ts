import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take, tap } from 'rxjs/operators';

export const REDIRECT_URL_KEY = 'redirect-url';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.checkAuthentication().pipe(
        take(1),
        tap(value => {
          console.log('value >>> ', value);
          if (!value) {
            console.log('setting auth --', state.url);
            this.router.navigate(['login'], { queryParams: { REDIRECT_URL_KEY: state.url } });
          }
          return value;
        })
      );
  }

}
