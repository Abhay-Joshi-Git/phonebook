import { Action } from '@ngrx/store';
import { PhoneBookRecord } from './state';

export enum PhoneBookActionType {
    ADD_RECORD = '[phoneBook] ADD_RECORD',
    EDIT_RECORD = '[phoneBook] EDIT_RECORD',
    DELETE_RECORD = '[phoneBook] DELETE_RECORD',
    SET_RECORDS = '[phoneBook] SET_RECORDs'
}

export class AddRecord implements Action {
    readonly type = PhoneBookActionType.ADD_RECORD;

    constructor(public readonly payload: PhoneBookRecord) {}
}


export interface EditRecordPayload {
    name: string;
    record: PhoneBookRecord;
}

export class EditRecord implements Action {
    readonly type = PhoneBookActionType.EDIT_RECORD;

    constructor(public readonly payload: EditRecordPayload) {}
}

export class DeleteRecord implements Action {
    readonly type = PhoneBookActionType.DELETE_RECORD;

    constructor(public readonly payload: string) {}
}

export class SetRecords implements Action {
    readonly type = PhoneBookActionType.SET_RECORDS;

    constructor(public readonly payload: Array<PhoneBookRecord>) {}
}

export type PhoneBookAction = AddRecord | EditRecord | DeleteRecord | SetRecords;
