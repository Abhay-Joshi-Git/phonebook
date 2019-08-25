import { Component, OnInit } from '@angular/core';
import { AuthState } from '../auth/store/state';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { Observable } from 'rxjs';
import { isAuthSelector } from '../auth/store/selectors';

@Component({
    selector: 'pb-tool-bar',
    templateUrl: './tool-bar.component.html',
    styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {
    isLoggedIn$: Observable<boolean>;
    constructor(
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.isLoggedIn$ = this.store.select(isAuthSelector);
    }
}
