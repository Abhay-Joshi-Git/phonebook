import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'pb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  formError: string | null = null;

  constructor(private readonly fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['abc', Validators.required],
      password: ['pass', Validators.required]
    });
  }

  onSubmit() {
    this.loading = true;
    this.formError = null;
    if (this.loginForm.valid) {
      this.authService.logIn(this.loginForm.value.userName, this.loginForm.value.password).pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe(null, (error) => {
          this.formError = error.message;
        });
    }
  }

}
