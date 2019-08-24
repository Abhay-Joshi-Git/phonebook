import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { AuthStateFeatureName } from './store/state';
import { authReducer } from './store/reducer';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { AuthAPIService } from './api.service';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthHTTPInterceptor } from './auth-http-interceptor.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    AuthRoutingModule,
  ],
  providers: [
    AuthAPIService,
  ]
})
export class AuthModule {
  static forRoot() {
    StoreModule.forFeature(AuthStateFeatureName, authReducer);
    return {
      ngModule: AuthModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthHTTPInterceptor, multi: true },
        AuthService,
        TokenService,
      ]
    };
  }
}
