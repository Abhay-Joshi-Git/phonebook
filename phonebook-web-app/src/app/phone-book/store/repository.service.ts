import { Injectable } from '@angular/core';
import { PhoneBookRecord, PhoneBookState } from './state';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { phoneBookFeatureSelector } from './selectors';
import { PhoneBookApiService } from '../api/api.service';
import { SetRecords, AddRecord, DeleteRecord, EditRecord } from './actions';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PhoneBookRepository {
    constructor(
        private readonly store: Store<PhoneBookState>,
        private readonly api: PhoneBookApiService
    ) {}

    getAllRecords(): Observable<Array<PhoneBookRecord>> {
        return this.store.select(phoneBookFeatureSelector);
    }

    fetchLatestRecords() {
        this.api.fetchPhoneBookRecords().subscribe(records => {
            this.store.dispatch(new SetRecords(records));
        });
    }

    addPhoneBookRecord(record: PhoneBookRecord) {
        return this.api.postPhoneBookRecord(record).pipe(
            tap(result => {
                this.store.dispatch(new AddRecord(result));
            })
        );
    }

    editPhoneBookRecord(name: string, record: PhoneBookRecord) {
        return this.api.editPhoneBookRecord(name, record).pipe(
            tap(() => {
                this.store.dispatch(new EditRecord({ name, record }));
            })
        );
    }

    deletePhoneBookRecord(name: string) {
        return this.api.deletePhoneBookRecord(name).pipe(
            tap(() => {
                this.store.dispatch(new DeleteRecord(name));
            })
        );
    }

}
