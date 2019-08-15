import { Component, OnInit, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { PhoneBookRecord } from '../store/state';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';

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
export class PhoneBookRecordEditingComponent implements OnInit, OnChanges {
  recordEditForm: FormGroup;
  title = '';
  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PhoneBookRecordEditData,
    private readonly formBuilder: FormBuilder,
  ) {}

  private getTitleFromData(data: PhoneBookRecordEditData): string {
    return data.record ? 'Edit Record' : 'Add New Record';
  }

  ngOnInit() {
    this.title = this.getTitleFromData(this.data);
    this.recordEditForm = this.formBuilder.group({
      name: this.data.record ? this.data.record.name : '',
      phoneNumbers: this.data.record ? this.data.record.phoneNumbers : []
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes ---', changes);
  }

  onSubmit() {

  }

}
