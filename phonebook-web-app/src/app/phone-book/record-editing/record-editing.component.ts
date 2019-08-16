import { Component, OnInit, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { PhoneBookRecord } from '../store/state';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhoneBookRepository } from '../store/repository.service';

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
    @Inject(MAT_DIALOG_DATA) public data: PhoneBookRecordEditData,
    private readonly formBuilder: FormBuilder,
    private readonly repositoryService: PhoneBookRepository
  ) {}

  private getTitleFromData(data: PhoneBookRecordEditData): string {
    return data.record ? 'Edit Record' : 'Add New Record';
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
      this.repositoryService.addPhoneBookRecord(newRecord).subscribe();
    }
  }

}
