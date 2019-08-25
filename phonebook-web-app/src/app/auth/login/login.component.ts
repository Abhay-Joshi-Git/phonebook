import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { finalize, tap, map, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { REDIRECT_URL_KEY } from '../auth.guard';

@Component({
  selector: 'pb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  formError: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['abc', Validators.required],
      password: ['pass', Validators.required]
    });
    this.activatedRoute.queryParamMap.pipe(
      map(params => params.get(REDIRECT_URL_KEY) || ''),
      take(1)
    ).subscribe(redirectUrl => {
      console.log(' redirect param  ', redirectUrl);
    });
  }

  onSubmit() {
    this.loading = true;
    this.formError = null;
    if (this.loginForm.valid) {
      this.authService.logIn(this.loginForm.value.userName, this.loginForm.value.password).pipe(
        tap(() => {
          this.activatedRoute.queryParamMap.pipe(
            map(params => params.get(REDIRECT_URL_KEY) || ''),
            take(1)
          ).subscribe(redirectUrl => {
            this.router.navigate([redirectUrl]);
          });
        }),
        finalize(() => {
          this.loading = false;
        })
      ).subscribe(null, (error) => {
        this.formError = error.message;
      });
    }
  }

}
