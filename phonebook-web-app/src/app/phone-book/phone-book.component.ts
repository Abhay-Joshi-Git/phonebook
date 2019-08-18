import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { PhoneBookRepository } from './store/repository.service';
import { PhoneBookRecord } from './store/state';
import {
    PhoneBookRecordEditingComponent,
    PhoneBookRecordEditData,
    PhoneBookRecordEditType
} from './record-editing/record-editing.component';
import { ConfirmationDialogComponent } from '../ui/confirmation-dialog/confirmation-dialog.component';

interface PhoneBookRecordTableItem extends PhoneBookRecord {
    phoneNumbersStr: string;
}

@Component({
    selector: 'pb-phone-book',
    templateUrl: './phone-book.component.html',
    styleUrls: ['./phone-book.component.scss']
})
export class PhoneBookComponent implements OnInit, OnDestroy {
    private phoneBookSubscription: Subscription = Subscription.EMPTY;
    private breakPointsSubscription: Subscription = Subscription.EMPTY;

    isMobile = false;
    isActivityInProgress = false;
    columnsToDisplay = ['name', 'phoneNumbersStr', 'actions'];
    dataSource = new MatTableDataSource<PhoneBookRecordTableItem>();

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private readonly phoneBookRepository: PhoneBookRepository,
        private readonly breakpointObserver: BreakpointObserver,
        private dialog: MatDialog,
    ) {}

    ngOnInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.subscribeForRecords();
        this.initiateRecordFetching();
    }

    private subscribeForRecords() {
        this.phoneBookSubscription = this.phoneBookRepository.getAllRecords().pipe(
            map(records => records.map(record => ({
                ...record,
                phoneNumbersStr: record.phoneNumbers && record.phoneNumbers.join(', ')
            }))),
        ).subscribe(records => {
            this.dataSource.data = records;
        });
        this.breakPointsSubscription = this.breakpointObserver.observe(['(max-width: 599px)']).subscribe(result => {
            this.isMobile = result.matches;
            this.dataSource.paginator = result.matches ? null : this.paginator;
        });
    }

    private initiateRecordFetching() {
        this.isActivityInProgress = true;
        this.phoneBookRepository.fetchLatestRecords().pipe(
            finalize(() => this.isActivityInProgress = false)
        ).subscribe();
    }

    applyFilter(filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnDestroy(): void {
        this.phoneBookSubscription.unsubscribe();
        this.breakPointsSubscription.unsubscribe();
    }

    editRecord(row) {
        const editDialogData: PhoneBookRecordEditData = {
            type: PhoneBookRecordEditType.EDIT,
            record: {
                name: row.name,
                phoneNumbers: row.phoneNumbers
            }
        };
        this.dialog.open(PhoneBookRecordEditingComponent, {
            data: editDialogData,
        });
    }

    deleteRecord(row) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                message: `Are you sure you want to delete the record ?`
            },
            autoFocus: false,
            restoreFocus: true,
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.isActivityInProgress = true;
                this.phoneBookRepository.deletePhoneBookRecord(row.name).pipe(
                    finalize(() => this.isActivityInProgress = false)
                ).subscribe();
            }
        });
    }
}
