import { TestBed } from '@angular/core/testing';
import { ProgressIndicatorRepositoryService } from './repository.service';

describe('ProgressIndicatorRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgressIndicatorRepositoryService = TestBed.get(ProgressIndicatorRepositoryService);
    expect(service).toBeTruthy();
  });
});
