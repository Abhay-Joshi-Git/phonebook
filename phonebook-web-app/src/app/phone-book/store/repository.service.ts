import { Injectable } from '@angular/core';
import { PhoneBookRecord, PhoneBookState } from './state';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { phoneBookFeatureSelector } from './selectors';
import { PhoneBookApiService } from '../api/api.service';
import { SetRecords } from './actions';

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
        return this.api.postPhoneBookRecord(record);
    }

}
