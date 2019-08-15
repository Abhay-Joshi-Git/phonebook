import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordEditingComponent } from './record-editing.component';

describe('RecordEditingComponent', () => {
  let component: RecordEditingComponent;
  let fixture: ComponentFixture<RecordEditingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordEditingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
