import { Component, OnInit, Inject, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { PhoneBookRecord } from '../store/state';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { PhoneBookRepository } from '../store/repository.service';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

export enum PhoneBookRecordEditType {
  ADD = 'ADD',
  EDIT = 'EDIT'
}

export interface PhoneBookRecordEditData {
  type: PhoneBookRecordEditType;
  record?: PhoneBookRecord;
}


@Component({
  selector: 'pb-phone-book-record-editing',
  templateUrl: './record-editing.component.html',
  styleUrls: ['./record-editing.component.scss']
})
export class PhoneBookRecordEditingComponent implements OnInit {
  recordEditForm: FormGroup;
  title = '';
  loading = false;

  constructor(
    private readonly dialogRef: MatDialogRef<PhoneBookRecordEditingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PhoneBookRecordEditData,
    private readonly formBuilder: FormBuilder,
    private readonly repositoryService: PhoneBookRepository,
    private readonly snackBar: MatSnackBar,
    private readonly cdRef: ChangeDetectorRef,
  ) {}

  isEditing(): boolean {
    return this.data.type === PhoneBookRecordEditType.EDIT;
  }

  private getTitleFromData(): string {
    return this.isEditing() ? 'Edit Record' : 'Add New Record';
  }

  get phoneNumbers() {
    return this.recordEditForm.get('phoneNumbers') as FormArray;
  }

  addPhoneNumber() {
    this.phoneNumbers.push(this.getNewPhoneNumberControl(''));
    this.cdRef.detectChanges();
  }

  private getNewPhoneNumberControl(val) {
    return this.formBuilder.control(val, [ Validators.required, this.phoneValidator ]);
  }

  removePhoneNumber(index) {
    this.phoneNumbers.removeAt(index);
    this.recordEditForm.updateValueAndValidity();
  }

  private createFormGroup() {
    const nameValue = this.data.record ? this.data.record.name : 'test';
    const phoneNumbersValue = this.data.record ? this.data.record.phoneNumbers : [''];
    this.recordEditForm = this.formBuilder.group({
      name: [nameValue, Validators.required],
      phoneNumbers: this.formBuilder.array(phoneNumbersValue.map(val => this.getNewPhoneNumberControl(val)))
    });
  }

  private phoneValidator(control: AbstractControl) {
      const value = control.value && control.value.trim();
      const phonePatternRegex = /^\+?([0-9]{2,})\)?[-. ]?([0-9]{2,})[-. ]?([0-9]{2,})$/;
      const has10Digits = value && value.replace(/\+?-?\.?/g, '').length === 10;
      return phonePatternRegex.test(value) && has10Digits
        ? null
        : { invalidPhoneNumber: { value }};
  }

  ngOnInit() {
    this.title = this.getTitleFromData();
    this.createFormGroup();
  }

  onSubmit() {
    if (this.recordEditForm.valid) {
      const record: PhoneBookRecord = {
        name: this.recordEditForm.value.name,
        phoneNumbers: this.recordEditForm.value.phoneNumbers
      };
      this.loading = true;
      if (this.isEditing()) {
        console.log('editing....', this.data.record.name, record);
        this.repositoryService.editPhoneBookRecord(this.data.record.name, record)
          .subscribe(this.onRecordEditedSuccess, this.onRecordEditingFailure);
      } else {
        this.repositoryService.addPhoneBookRecord(record).subscribe(this.onRecordEditedSuccess, this.onRecordEditingFailure);
      }
    }
  }

  get getFormLevelError() {
    return this.recordEditForm.errors && this.recordEditForm.errors.form;
  }

  private onRecordEditedSuccess = (record) => {
    this.loading = false;
    const actionDone = this.isEditing()
      ? 'edited'
      : 'added';
    this.snackBar.open(`record ${actionDone} successfully`, 'X', {
      duration: 3000
    });
    this.closeDialog(record);
  }

  private onRecordEditingFailure = (error: HttpErrorResponse) => {
    this.loading = false;
    console.log('error', error);
    this.recordEditForm.setErrors({
      form: 'Error - ' + error.error
    });
  }

  private closeDialog(result) {
    if (this.dialogRef) {
      this.dialogRef.close(result);
    }
  }

}
