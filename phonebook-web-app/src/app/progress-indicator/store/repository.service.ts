import { Injectable } from '@angular/core';
import { InProgressState, SetInProgress, InProgressStateFeatureName } from './in-progress.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressIndicatorRepositoryService {

  constructor(private readonly store: Store<InProgressState>) { }

  getIsInProgress(): Observable<boolean> {
    return this.store.select(state => state[InProgressStateFeatureName]);
  }

  setInProgress(val: boolean) {
    this.store.dispatch(new SetInProgress(val));
  }
}
