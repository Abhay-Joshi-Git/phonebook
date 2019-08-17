import { Component, Inject, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

export interface ConfirmationDialogData {
  title?: string;
  message: string;
}

@Component({
  selector: 'pb-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements AfterViewInit {
  @ViewChild('noButton', { read: ElementRef, static: false }) noButton!: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) { }

  ngAfterViewInit(): void {
    this.noButton.nativeElement.focus();
  }

}
