import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PhoneBookRecord } from '../store/state';

@Injectable({
    providedIn: 'root'
})
export class PhoneBookApiService {
    constructor(private readonly httpClient: HttpClient) {}

    fetchPhoneBookRecords() {
        return this.httpClient.get<Array<PhoneBookRecord>>('/api/phone-book');
    }
}
