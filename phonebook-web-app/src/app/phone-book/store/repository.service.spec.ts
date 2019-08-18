import { PhoneBookRepository } from './repository.service';
import { PhoneBookState, PhoneBookRecord } from './state';
import { PhoneBookApiService } from '../api/api.service';
import { Store } from '@ngrx/store';
import { mock, instance, when, verify, deepEqual } from 'ts-mockito';
import { of } from 'rxjs';
import { SetRecords, AddRecord, EditRecord, DeleteRecord } from './actions';

describe('PhoneBookRepository', () => {

    let phoneBookRepository: PhoneBookRepository;

    let store: Store<PhoneBookState>;
    let api: PhoneBookApiService;


    const recordAbc: PhoneBookRecord = {
        name: 'abc',
        phoneNumbers: [ '44334535343' ]
    };
    const records: Array<PhoneBookRecord> = [recordAbc];

    beforeEach(() => {
        store = mock(Store);
        api = mock(PhoneBookApiService);

        phoneBookRepository = new PhoneBookRepository(
            instance(store),
            instance(api),
        );
    });

    it('should call api method and update state when fetchLatestRecords gets called', (done) => {
        when(api.fetchPhoneBookRecords()).thenReturn(of(records));
        phoneBookRepository.fetchLatestRecords().subscribe(() => {
            verify(api.fetchPhoneBookRecords()).once();
            const setRecordsAction = new SetRecords(records);
            verify(store.dispatch(deepEqual(setRecordsAction))).once();
            done();
        });
    });

    it('should call api postPhoneBookRecord and update state when addPhoneBookRecord gets called', (done) => {
        when(api.postPhoneBookRecord(recordAbc)).thenReturn(of(recordAbc));
        phoneBookRepository.addPhoneBookRecord(recordAbc).subscribe(() => {
            const addAction = new AddRecord(recordAbc);
            verify(api.postPhoneBookRecord(recordAbc)).once();
            verify(store.dispatch(deepEqual(addAction))).once();
            done();
        });
    });

    it('should call api editPhoneBookRecord and update state when editPhoneBookRecord  gets called', (done) => {
        const updatedRecord: PhoneBookRecord = {
            name: 'pqr',
            phoneNumbers: [ '44334535343' ]
        };
        when(api.editPhoneBookRecord('abc', updatedRecord)).thenReturn(of(updatedRecord));
        phoneBookRepository.editPhoneBookRecord('abc', updatedRecord).subscribe(() => {
            const editAction = new EditRecord({ name: 'abc', record: updatedRecord });
            verify(api.editPhoneBookRecord('abc', updatedRecord)).once();
            verify(store.dispatch(deepEqual(editAction))).once();
            done();
        });
    });

    it('should call deletePhoneBookRecord and update state on delete', (done) => {
        when(api.deletePhoneBookRecord('abc')).thenReturn(of(recordAbc));
        phoneBookRepository.deletePhoneBookRecord('abc').subscribe(() => {
            const deleteAction = new DeleteRecord('abc');
            verify(api.deletePhoneBookRecord('abc')).once();
            verify(store.dispatch(deepEqual(deleteAction))).once();
            done();
        });
    });

    it('should call sync records and update state on update multiple records', (done) => {
        const updatedRecords: Array<PhoneBookRecord> = [
            ...records,
            {
                name: 'xyz',
                phoneNumbers: [ '4488578596' ]
            }
        ];
        when(api.syncRecords(updatedRecords)).thenReturn(of(updatedRecords));
        phoneBookRepository.updatePhoneBookRecords(updatedRecords).subscribe(() => {
            const setRecords = new SetRecords(updatedRecords);
            verify(api.syncRecords(updatedRecords)).once();
            verify(store.dispatch(deepEqual(setRecords))).once();
            done();
        });
    });

});
