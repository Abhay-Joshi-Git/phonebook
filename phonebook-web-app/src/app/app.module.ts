import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhoneBookComponent } from './phone-book/phone-book.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PhoneBookRecordEditingComponent } from './phone-book/record-editing/record-editing.component';
import { UiModule } from './ui/ui.module';
import { PhoneBookActionsComponent } from './phone-book/actions/actions.component';
import { ProgressIndicatorComponent } from './progress-indicator/progress-indicator.component';
import { HTTPRequestsInterceptor } from './http-interceptor.service';
import { GlobalErrorHandler } from './error-handling/error-handler';
import { ErrorDisplayComponent } from './error-handling/error-display/error-display.component';
import { AuthModule } from './auth/auth.module';

export function ngrxDevTools() {
  return environment.production ? [] : StoreDevtoolsModule.instrument();
}

@NgModule({
  declarations: [
    AppComponent,
    PhoneBookComponent,
    ToolBarComponent,
    PhoneBookRecordEditingComponent,
    PhoneBookActionsComponent,
    ProgressIndicatorComponent,
    ErrorDisplayComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule.forRoot(),
    StoreModule.forRoot(appReducers),
    ngrxDevTools(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HTTPRequestsInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    PhoneBookRecordEditingComponent
  ]
})
export class AppModule { }
