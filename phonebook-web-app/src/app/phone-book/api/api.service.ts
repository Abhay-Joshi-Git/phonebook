import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PhoneBookRecord } from '../store/state';

const basePhoneBookAPIUrl = '/api/phone-book';

@Injectable({
    providedIn: 'root'
})
export class PhoneBookApiService {
    constructor(private readonly httpClient: HttpClient) {}

    fetchPhoneBookRecords() {
        return this.httpClient.get<Array<PhoneBookRecord>>(basePhoneBookAPIUrl);
    }

    postPhoneBookRecord(phoneBookRecord: PhoneBookRecord) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
            })
        };
        return this.httpClient.post<PhoneBookRecord>(basePhoneBookAPIUrl, phoneBookRecord, httpOptions);
    }

    editPhoneBookRecord(name: string, phoneBookRecord: PhoneBookRecord) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
            })
        };
        return this.httpClient.put<PhoneBookRecord>(basePhoneBookAPIUrl + `/${name}`, phoneBookRecord, httpOptions);
    }

    deletePhoneBookRecord(name: string) {
        return this.httpClient.delete(basePhoneBookAPIUrl + `/${name}`);
    }

    syncRecords(records: Array<PhoneBookRecord>) {
        const httpOptions = {
            params: new HttpParams({
                fromObject: { sync: 'true' }
            })
        };
        return this.httpClient.put<Array<PhoneBookRecord>>(basePhoneBookAPIUrl, records, httpOptions);
    }
}
