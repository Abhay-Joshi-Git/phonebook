import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressIndicatorComponent } from './progress-indicator.component';
import { ProgressIndicatorRepositoryService } from './store/repository.service';
import { mock, instance } from 'ts-mockito';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

let repositoryService: ProgressIndicatorRepositoryService;

describe('ProgressIndicatorComponent', () => {
  let component: ProgressIndicatorComponent;
  let fixture: ComponentFixture<ProgressIndicatorComponent>;

  beforeEach(async(() => {
    repositoryService = mock(ProgressIndicatorRepositoryService);

    TestBed.configureTestingModule({
      declarations: [ ProgressIndicatorComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: ProgressIndicatorRepositoryService, useFactory: () => instance(repositoryService) }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
