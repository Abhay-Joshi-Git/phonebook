import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PhoneBookRecord } from '../store/state';

@Injectable({
    providedIn: 'root'
})
export class PhoneBookApiService {
    constructor(private readonly httpClient: HttpClient) {}

    fetchPhoneBookRecords() {
        return this.httpClient.get<Array<PhoneBookRecord>>('/api/phone-book');
    }

    postPhoneBookRecord(phoneBookRecord: PhoneBookRecord) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
            })
        };
        return this.httpClient.post<PhoneBookRecord>('/api/phone-book', phoneBookRecord, httpOptions);
    }
}
