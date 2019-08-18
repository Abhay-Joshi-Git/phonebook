import { TestBed } from '@angular/core/testing';
import { ProgressIndicatorRepositoryService } from './repository.service';
import { Store } from '@ngrx/store';
import { InProgressState } from './in-progress.state';
import { mock, instance } from 'ts-mockito';

let store: Store<InProgressState>;

describe('ProgressIndicatorRepositoryService', () => {
  beforeEach(() => {
    store = mock(Store);
    TestBed.configureTestingModule({
      providers: [
        { provide: Store, useFactory: () => instance(store) }
      ]
    });
  });

  it('should be created', () => {
    const service: ProgressIndicatorRepositoryService = TestBed.get(ProgressIndicatorRepositoryService);
    expect(service).toBeTruthy();
  });
});
