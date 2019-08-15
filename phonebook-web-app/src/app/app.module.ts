import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhoneBookComponent } from './phone-book/phone-book.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { MaterialModule } from './material.module';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PhoneBookRecordEditingComponent } from './phone-book/record-editing/record-editing.component';

export function ngrxDevTools() {
  return environment.production ? [] : StoreDevtoolsModule.instrument();
}

@NgModule({
  declarations: [
    AppComponent,
    PhoneBookComponent,
    ToolBarComponent,
    PhoneBookRecordEditingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    StoreModule.forRoot(appReducers),
    ngrxDevTools(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    PhoneBookRecordEditingComponent
  ]
})
export class AppModule { }
