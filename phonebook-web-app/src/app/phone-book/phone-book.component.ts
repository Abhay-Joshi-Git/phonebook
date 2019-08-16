import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { PhoneBookRepository } from './store/repository.service';
import { PhoneBookRecord } from './store/state';
import {
    PhoneBookRecordEditingComponent,
    PhoneBookRecordEditData,
    PhoneBookRecordEditType
} from './record-editing/record-editing.component';

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
    columnsToDisplay = ['name', 'phoneNumbersStr'];
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
        this.phoneBookSubscription = this.phoneBookRepository.getAllRecords().pipe(
            map(records => records.map(record => ({
                ...record,
                phoneNumbersStr: record.phoneNumbers.join(', ')
            })))
        ).subscribe(records => {
            this.dataSource.data = records;
        });
        this.breakPointsSubscription = this.breakpointObserver.observe(['(max-width: 599px)']).subscribe(result => {
            this.isMobile = result.matches;
            this.dataSource.paginator = result.matches ? null : this.paginator;
        });
        this.phoneBookRepository.fetchLatestRecords();
    }

    applyFilter(filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnDestroy(): void {
        this.phoneBookSubscription.unsubscribe();
        this.breakPointsSubscription.unsubscribe();
    }

    addRecord() {
        const editDialogData: PhoneBookRecordEditData = {
            type: PhoneBookRecordEditType.ADD
        };
        this.dialog.open(PhoneBookRecordEditingComponent, {
            data: editDialogData,
        });
    }
}
