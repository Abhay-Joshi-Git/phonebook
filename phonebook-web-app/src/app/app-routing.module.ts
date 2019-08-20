import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhoneBookComponent } from './phone-book/phone-book.component';
import { ErrorDisplayComponent } from './error-handling/error-display/error-display.component';

const routes: Routes = [
  { path: '', component: PhoneBookComponent, pathMatch: 'full' },
  { path: 'error', component: ErrorDisplayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
