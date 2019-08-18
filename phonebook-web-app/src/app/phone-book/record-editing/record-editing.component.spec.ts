import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PhoneBookRecordEditingComponent, PhoneBookRecordEditData, PhoneBookRecordEditType } from './record-editing.component';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhoneBookRepository } from '../store/repository.service';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { mock, instance, verify, deepEqual, anything } from 'ts-mockito';

let dialogRef: MatDialogRef<PhoneBookRecordEditingComponent>;
let data: PhoneBookRecordEditData; // MAT_DIALOG_DATA
let formBuilder: FormBuilder;
let repositoryService: PhoneBookRepository;
let snackBar: MatSnackBar;
let cdRef: ChangeDetectorRef;

describe('PhoneBookRecordEditingComponent', () => {
  let component: PhoneBookRecordEditingComponent;
  let fixture: ComponentFixture<PhoneBookRecordEditingComponent>;

  beforeEach(async(() => {
    dialogRef = mock(MatDialogRef);
    formBuilder = mock(FormBuilder);
    repositoryService = mock(PhoneBookRepository);
    snackBar = mock(MatSnackBar);
    cdRef = mock(ChangeDetectorRef);

    data = {
      type: PhoneBookRecordEditType.ADD
    };

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [ PhoneBookRecordEditingComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: MatDialogRef, useFactory: () => instance(dialogRef) },
        // { provide: FormBuilder, useFactory: () => instance(formBuilder) },
        { provide: PhoneBookRepository, useFactory: () => instance(repositoryService) },
        { provide: MatSnackBar, useFactory: () => instance(snackBar) },
        { provide: ChangeDetectorRef, useFactory: () => instance(cdRef) },
        { provide: MAT_DIALOG_DATA, useValue: data }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneBookRecordEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should determine isEditing correctly', () => {
    component.data = {
      type: PhoneBookRecordEditType.ADD
    };
    fixture.detectChanges();
    expect(component.isEditing()).toEqual(false);

    component.data = {
      type: PhoneBookRecordEditType.EDIT
    };
    fixture.detectChanges();
    expect(component.isEditing()).toEqual(true);
  });
});
