import { phoneBookReducer } from './reducer';
import { PhoneBookState, PhoneBookInitialState, PhoneBookRecord } from './state';
import { AddRecord, DeleteRecord, EditRecord, EditRecordPayload, SetRecords } from './actions';

let state: PhoneBookState;

const recordXYZ: PhoneBookRecord = {
    name: 'xyz',
    phoneNumbers: ['4435453455']
};

describe('PhoneBookReducer', () => {
    beforeEach(() => {
        state = [{
            name: 'abc',
            phoneNumbers: ['2238499343']
        }];
    });

    it('reduce state for add record action', () => {
        const result = phoneBookReducer(state, new AddRecord(recordXYZ));
        const expected = [
            {
                name: 'abc',
                phoneNumbers: ['2238499343']
            },
            {
                name: 'xyz',
                phoneNumbers: ['4435453455']
            }
        ];
        expect(result).toEqual(expected);
    });

    it('reduce state for delete record action', () => {
        const result = phoneBookReducer(state, new DeleteRecord('abc'));
        const expected = [];
        expect(result).toEqual(expected);
    });

    it('reduce state for edit record action', () => {
        const updatedRecord: EditRecordPayload = {
            name: 'abc',
            record: {
                name: 'abc',
                phoneNumbers: ['9199837483']
            }
        };
        const result = phoneBookReducer(state, new EditRecord(updatedRecord));
        const expected = [
            {
                name: 'abc',
                phoneNumbers: ['9199837483']
            }
        ];
        expect(result).toEqual(expected);
    });

    it('reduce state for set records actions', () => {
        const records: Array<PhoneBookRecord> = [
            {
                name: 'abc',
                phoneNumbers: ['446656775']
            },
            {
                name: 'xyz',
                phoneNumbers: ['4435453455']
            }
        ];
        const result = phoneBookReducer(state, new SetRecords(records));
        expect(result).toEqual(records);
    });
});
