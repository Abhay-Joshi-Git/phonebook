import { Component, OnInit, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { PhoneBookRecord } from '../store/state';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhoneBookRepository } from '../store/repository.service';
import { MatSnackBar } from '@angular/material';

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
  ) {}

  private getTitleFromData(data: PhoneBookRecordEditData): string {
    return data.type === PhoneBookRecordEditType.EDIT ? 'Edit Record' : 'Add New Record';
  }

  get phoneNumbers() {
    return this.recordEditForm.get('phoneNumbers') as FormArray;
  }

  addPhoneNumber() {
    this.phoneNumbers.push(this.formBuilder.control(''));
  }

  removePhoneNumber(index) {
    this.phoneNumbers.removeAt(index);
  }

  private createFormGroup() {
    const nameValue = this.data.record ? this.data.record.name : 'test';
    const phoneNumbersValue = this.data.record ? this.data.record.phoneNumbers : [];
    this.recordEditForm = this.formBuilder.group({
      name: [nameValue, Validators.required],
      phoneNumbers: this.formBuilder.array([
        this.formBuilder.control('', Validators.required)
      ])
    });
  }

  ngOnInit() {
    this.title = this.getTitleFromData(this.data);
    this.createFormGroup();
  }

  onSubmit() {
    if (this.recordEditForm.valid) {
      const newRecord: PhoneBookRecord = {
        name: this.recordEditForm.value.name,
        phoneNumbers: this.recordEditForm.value.phoneNumbers
      };
      this.repositoryService.addPhoneBookRecord(newRecord).subscribe((v) => {
        const actionDone = this.data.type === PhoneBookRecordEditType.EDIT
          ? 'edited'
          : 'added';
        this.snackBar.open(`record ${actionDone} successfully`, 'X', {
          duration: 3000
        });
        this.closeDialog(v);
      });
    }
  }

  closeDialog(result) {
    if (this.dialogRef) {
      this.dialogRef.close(result);
    }
  }

}
