export interface PhoneBookRecord {
    name: string;
    phoneNumbers: Array<string>;
}

export const PhoneBookFeatureName = 'phoneBook';

export type PhoneBookState = Array<PhoneBookRecord>;

export const PhoneBookInitialState: PhoneBookState = [];

