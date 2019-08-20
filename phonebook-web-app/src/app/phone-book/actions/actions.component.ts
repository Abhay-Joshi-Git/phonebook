import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import {
    PhoneBookRecordEditData,
    PhoneBookRecordEditType,
    PhoneBookRecordEditingComponent
} from '../record-editing/record-editing.component';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { PhoneBookRepository } from '../store/repository.service';
import { take } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { PhoneBookRecord } from '../store/state';

const phoneNumberSeparator = ' ';

@Component({
    selector: 'pb-phone-book-actions',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.scss']
})
export class PhoneBookActionsComponent implements OnInit, OnDestroy {

    private editDialogRef: MatDialogRef<PhoneBookRecordEditingComponent>;

    @Input() disabled = false;
    @ViewChild('fileInput', { read: ElementRef, static: true }) fileInput!: ElementRef;

    constructor(
      private readonly repository: PhoneBookRepository,
      private readonly dialog: MatDialog,
      private readonly snackBar: MatSnackBar,
    ) {}

    ngOnInit() {}

    addRecord() {
        const editDialogData: PhoneBookRecordEditData = {
            type: PhoneBookRecordEditType.ADD
        };
        if (this.editDialogRef) {
          this.editDialogRef.close();
        }
        this.editDialogRef = this.dialog.open(PhoneBookRecordEditingComponent, {
            data: editDialogData
        });
    }

    private serializeRecords(records: Array<PhoneBookRecord>): Array<string> {
        return records.map(record => {
          const content = record
            ? record.name + ',' + record.phoneNumbers.join(phoneNumberSeparator)
            : '';
          return content + '\r\n';
        });
    }

    private deserializeRecords(records: Array<string>): Array<PhoneBookRecord> {
      return records.map(record => {
        const [name, phoneNumbers] = record.split(',');
        return {
          name,
          phoneNumbers: phoneNumbers.split(' ')
        };
      });
    }

    savePhoneBook() {
      this.repository.getAllRecords().pipe(
        take(1)
      ).subscribe((records) => {
          const blob = new Blob(this.serializeRecords(records), { type: 'text/plain;charset=utf-8' });
          saveAs(blob, 'phoneBook');
      });
    }

    uploadPhoneBook() {
      if (this.fileInput) {
        this.fileInput.nativeElement.click();
      }
    }

    handleFiles(event) {
      const selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', e => {
          const textFile: FileReader = e.target as FileReader;
          const results = textFile.result as string;
          const records = this.deserializeRecords(results.trim().split('\r\n'));
          this.repository.updatePhoneBookRecords(records).subscribe(() => {
            this.snackBar.open(`records updated successfully`, 'X', {
              duration: 3000
            });
          }, (error) => {
            this.snackBar.open(`records did not updated successfully, error - ${error.error}`, 'X', {
              duration: 3000
            });
          });
      });
      reader.readAsText(selectedFile);
    }

    ngOnDestroy(): void {
      if (this.editDialogRef) {
        this.editDialogRef.close();
      }
    }
}
